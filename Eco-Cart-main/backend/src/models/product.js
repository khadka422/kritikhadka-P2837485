import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "/uploads/products/default.jpg",
    },
    category: {
      type: String,
      required: true,
    },
    carbonFootprint: {
      type: Number,
      required: true,
    },
    ecoScore: {
      type: String,
      default: "C",
    },
    description: String,
    materials: [String],
    stock: {
      type: Number,
      default: 10,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
