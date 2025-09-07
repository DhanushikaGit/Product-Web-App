import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js"; // import Product model

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

/**
 * Create product (POST)
 */
app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ message: "Please provide name, price and image" });
  }

  try {
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * Get all products (GET)
 */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * Update product (PUT)
 */
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * Delete product (DELETE)
 */
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Use PORT from .env or fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
