import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import logger from "../utils/logger.js";
import { request } from "http";
import { requestId } from "./requestId.middleware.js";

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  // Zod Validation Error
  if (err instanceof ZodError) {
    statusCode = 400; 
    message = "Validation failed";

    errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Prisma Unique Constraint
  else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    statusCode = 409;

    const field = err.meta?.target?.[0];

    message = `${field} already exists`;
  }

  logger.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    requestId: req.requestId,
    message,
    errors,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};