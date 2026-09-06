import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

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
    statusCode = 404;
    message = "Resource not found";
  }


  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};