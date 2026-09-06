import jwt from "jsonwebtoken";
import { env } from "../config/env.js"
// Create Access Token
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};

// Create Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET
  );
};