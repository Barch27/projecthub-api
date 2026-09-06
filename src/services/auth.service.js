import bcrypt from "bcrypt";
import redis from "../redis/client.js";

import { ApiError } from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import * as userRepository from "../repositories/user.repository.js";
import logger from "../utils/logger.js"

export const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    logger.warn({
      event: "LOGIN_FAILED",
      email,
      reason: "User not found",
    });
    throw new ApiError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    logger.warn({
      event: "LOGIN_FAILED",
      email,
      userId: user.id,
      reason: "Incorrect password",
    });

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

  logger.info({
    event: "USER_LOGIN",
    userId: user.id,
    email: user.email,
  });

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

export const logoutUser = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  await redis.del(`refresh:${decoded.id}`);

  logger.info({
    event: "USER_LOGOUT",
    userId: decoded.id,
  });
};

export const refreshUserToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const storedToken = await redis.get(
    `refresh:${decoded.id}`
  );

  if (!storedToken || storedToken !== refreshToken) {
    logger.warn({
      event: "REFRESH_TOKEN_FAILED",
      userId: decoded.id,
    });

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

  logger.info({
    event: "REFRESH_TOKEN_ROTATED",
    userId: user.id,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};