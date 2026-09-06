import bcrypt from "bcrypt";
import redis from "../redis/client.js";

import { ApiError } from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import * as userRepository from "../repositories/user.repository.js";

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await redis.set(
    `refresh:${user.id}`,
    refreshToken,
    {
      EX: 60 * 60 * 24 * 7,
    }
  );

  return {
    accessToken,
    refreshToken,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const refreshUserToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const storedToken = await redis.get(
    `refresh:${decoded.id}`
  );

  if (!storedToken || storedToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await userRepository.getUserById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await redis.set(
    `refresh:${user.id}`,
    newRefreshToken,
    {
      EX: 60 * 60 * 24 * 7,
    }
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};