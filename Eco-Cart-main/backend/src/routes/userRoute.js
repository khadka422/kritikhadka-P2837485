// routes/userRoutes.js
import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";
import calculateEcoScore from "../utils/calculateEcoScore.js";

const router = express.Router();

router.get("/:id/profile", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);

  const result = await Order.aggregate([
    // only this user's orders
    { $match: { user: userId } },

    // split items array
    { $unwind: "$items" },

    // join product data
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    // aggregate totals + group products
    {
      $group: {
        _id: "$product._id",

        productName: { $first: "$product.name" },
        image: { $first: "$product.image" },
        price: { $first: "$product.price" },
        carbonFootprint: { $first: "$product.carbonFootprint" },

        totalQuantity: { $sum: "$items.quantity" },
        totalSpentOnProduct: {
          $sum: {
            $multiply: ["$items.quantity", "$product.price"],
          },
        },

        totalCarbonFootprint: {
          $sum: {
            $multiply: ["$items.quantity", "$product.carbonFootprint"],
          },
        },
      },
    },

    // regroup everything into one document
    {
      $group: {
        _id: null,

        products: {
          $push: {
            productId: "$_id",
            name: "$productName",
            image: "$image",
            price: "$price",
            quantity: "$totalQuantity",
            spent: "$totalSpentOnProduct",
          },
        },

        totalItemsPurchased: { $sum: "$totalQuantity" },
        totalAmountSpent: { $sum: "$totalSpentOnProduct" },
        totalCarbonFootprint: {
          $sum: "$totalCarbonFootprint",
        },
      },
    },
  ]);

  const profile = result[0] || {
    products: [],
    totalItemsPurchased: 0,
    totalAmountSpent: 0,
    totalCarbonFootprint: 0,
  };

  const ecoScore = calculateEcoScore(profile.totalCarbonFootprint);

  res.json({
    ecoScore,
    totalItemsPurchased: profile.totalItemsPurchased,
    totalAmountSpent: profile.totalAmountSpent,
    products: profile.products,
  });
});

export default router;
