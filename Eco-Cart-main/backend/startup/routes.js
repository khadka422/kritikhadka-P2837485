import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import login from "../src/routes/login.js";
import productRoutes from "../src/routes/productRoutes.js";
import register from "../src/routes/register.js";
import adminDashboard from "../src/routes/adminDashboard.js";
import orderRoute from "../src/routes/orderRoute.js";
import authMiddleware from "../middleware/auth.js";
import userRoute from "../src/routes/userRoute.js";
import aiRoute from "../src/routes/aiRoute.js";

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (app) {
  // CORS middleware
  app.use(
    cors({
      origin: "http://localhost:5173", //frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // This makes files accessible via http://localhost:3000/uploads/
  const uploadsPath = path.join(__dirname, "../uploads");
  console.log("📁 Serving static files from:", uploadsPath);

  app.use("/uploads", express.static(uploadsPath));

  // Routes
  app.use("/api/products", productRoutes);
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/api/admin", adminDashboard);
  app.use("/api/order", authMiddleware, orderRoute);
  app.use("/api/user", userRoute);
  app.use("/api/ai", aiRoute);
}
