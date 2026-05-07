import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";

const router = express.Router();

// CREATE AN ORDER
router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    let totalPrice = 0;

    // Build order items with product validation
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        totalPrice += product.price * item.quantity;

        return {
          product: product._id,
          quantity: item.quantity,
        };
      }),
    );

    // Create the order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
