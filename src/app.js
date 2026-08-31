import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "ProjectHub API Running",
  });
});

const PORT = 4000

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});