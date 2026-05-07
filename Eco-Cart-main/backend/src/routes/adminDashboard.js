import express from "express";
import upload from "../../middleware/upload.js";
import Product from "../models/product.js";

const router = express.Router();

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log("Products fetched:", products.length);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE product
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    console.log("🎯 CREATE PRODUCT REQUEST RECEIVED");

    // Validate required fields
    const requiredFields = [
      "name",
      "brand",
      "price",
      "category",
      "carbonFootprint",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // Parse numbers
    const price = parseFloat(req.body.price);
    const carbonFootprint = parseFloat(req.body.carbonFootprint);
    const stock = parseInt(req.body.stock) || 10;

    if (isNaN(price) || isNaN(carbonFootprint)) {
      return res.status(400).json({
        success: false,
        message: "Price and carbon footprint must be valid numbers",
      });
    }

    // Parse materials
    let materialsArray = [];
    if (req.body.materials && req.body.materials.trim()) {
      materialsArray = req.body.materials
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m);
    }

    // Handle image URL
    let imageUrl = "/uploads/products/default.jpg";
    if (req.file) {
      imageUrl = `/uploads/products/${req.file.filename}`;
    }

    // Calculate ecoScore manually (since pre-save hook isn't working)
    let ecoScore = "C";
    if (carbonFootprint <= 1.5) ecoScore = "A+";
    else if (carbonFootprint <= 3.0) ecoScore = "A";
    else if (carbonFootprint <= 5.0) ecoScore = "B";
    else if (carbonFootprint <= 8.0) ecoScore = "C";
    else if (carbonFootprint <= 12.0) ecoScore = "D";
    else ecoScore = "F";

    // Calculate inStock
    const inStock = stock > 0;

    // Create product WITHOUT relying on pre-save hook
    const product = new Product({
      name: req.body.name.trim(),
      brand: req.body.brand.trim(),
      price: price,
      category: req.body.category,
      carbonFootprint: carbonFootprint,
      ecoScore: ecoScore, // Manually set
      stock: stock,
      inStock: inStock, // Manually set
      description: req.body.description ? req.body.description.trim() : "",
      materials: materialsArray,
      image: imageUrl,
    });

    console.log("💾 Saving product to DB...");

    // Save directly
    const savedProduct = await product.save();
    console.log("✅ Product saved to DB! ID:", savedProduct._id);

    res.json({
      success: true,
      data: savedProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("❌ Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE product
router.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update fields
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.price = req.body.price ? parseFloat(req.body.price) : product.price;
    product.category = req.body.category || product.category;
    product.carbonFootprint = req.body.carbonFootprint
      ? parseFloat(req.body.carbonFootprint)
      : product.carbonFootprint;
    product.stock = req.body.stock ? parseInt(req.body.stock) : product.stock;
    product.description = req.body.description || product.description;

    if (req.body.materials) {
      product.materials = req.body.materials.split(",").map((m) => m.trim());
    }

    if (req.file) {
      product.image = `/uploads/products/${req.file.filename}`;
    }

    await product.save();
    res.json({ success: true, data: product, message: "Product updated" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
