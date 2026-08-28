import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "ProjectHub API Running",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});