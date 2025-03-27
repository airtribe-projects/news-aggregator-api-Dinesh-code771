const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const userRoutes = require("./routes/user.route");
const newsRoutes = require("./routes/news.route");
const port = 5000;
const connectDB = require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/news", newsRoutes);

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
