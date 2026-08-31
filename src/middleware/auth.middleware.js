import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "Access token required");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};