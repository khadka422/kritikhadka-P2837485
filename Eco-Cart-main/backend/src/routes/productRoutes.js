import express from "express";
import Product from "../models/product.js";

const router = express.Router();

//Get all products with pagination, search, and filters
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      page = 1,
      limit = 12,
      ecoScore,
      sort = "featured",
    } = req.query;

    // Build query
    let query = { inStock: true };

    // Filter by category
    if (category && category !== "all" && category !== "All Categories") {
      query.category = category;
    }

    // Filter by ecoScore
    if (ecoScore && ecoScore !== "") {
      query.ecoScore = ecoScore;
    }

    // Search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Determine sort order
    let sortOption = {};
    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "ecoScore":
        sortOption = { ecoScoreNumeric: 1 }; // Use numeric score (1 = A+)
        break;
      case "featured":
      default:
        sortOption = { createdAt: -1 }; // Default: newest first
    }

    // Get products
    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort(sortOption)
      .select(
        "name brand price image category ecoScore carbonFootprint stock description materials createdAt",
      );

    // Get total count
    const total = await Product.countDocuments(query);

    // Format products
    const formattedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      ecoScore: product.ecoScore,
      carbonFootprint: product.carbonFootprint,
      image: product.image,
      stock: product.stock,
      description: product.description,
      materials: product.materials,
    }));

    res.json({
      success: true,
      products: formattedProducts,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
// GET single product (Simplified)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get 4 similar products (same category)
    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      inStock: true,
    })
      .limit(4)
      .select("name brand price image ecoScore");

    // Simple response
    res.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        description: product.description,
        category: product.category,
        ecoScore: product.ecoScore,
        carbonFootprint: product.carbonFootprint,
        materials: product.materials,
        image: product.image,
        stock: product.stock,
      },
      similarProducts: similarProducts.map((p) => ({
        id: p._id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        image: p.image,
        ecoScore: p.ecoScore,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
// Add this route to your productRoutes.js file, right before export default router;

// UPDATE stock after purchase (for checkout)
router.put("/:id/stock", async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if enough stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Not enough stock available. Only ${product.stock} left.`,
      });
    }

    // Update stock
    product.stock = product.stock - quantity;
    product.inStock = product.stock > 0;

    await product.save();

    res.json({
      success: true,
      data: product,
      message: `Stock updated. Remaining: ${product.stock}`,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stock",
    });
  }
});
// GET product categories (for filters)
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get categories",
    });
  }
});

export default router;
