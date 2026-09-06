import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";
import { env } from "./config/env.js"

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "ProjectHub API Running",
  });
});

app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});