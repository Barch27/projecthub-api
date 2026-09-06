import express from "express";

import { requestId } from "./middleware/requestId.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";


const app = express();

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;