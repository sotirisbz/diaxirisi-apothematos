import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For test routes
app.get("/", (req, res) => {
  res.json({ message: "Inventory Management API is running" });
});

//Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`);
});
