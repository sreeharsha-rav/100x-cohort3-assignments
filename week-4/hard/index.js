const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const authMiddleware = require("./middleware/auth");

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/healthy", (req, res) => res.send("I am Healthy"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

// error handler -> TODO: Implement a better error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// database connection and server start
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
