import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON body
app.use(express.json());


app.use("/api/products", productRoutes);

// Use PORT from .env or fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
