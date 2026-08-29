import { Prisma } from "@prisma/client";

export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Custom API Errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Prisma unique constraint
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message: "Email already exists.",
    });
  }

  // Unknown error
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};