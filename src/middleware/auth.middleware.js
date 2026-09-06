import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";


export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token required");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};