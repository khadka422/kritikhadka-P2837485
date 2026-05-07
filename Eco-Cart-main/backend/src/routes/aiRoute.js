import generateText from "../service/ai.js";
import projectContext from "../utils/projectContext.js";
import Product from "../models/product.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Fetch product info from DB
    const products = await Product.find({}).select("name description ecoScore");

    // Convert DB products to text
    const productText = products
      .map((p) => `- ${p.name}: ${p.description}. Eco-score: ${p.ecoScore}`)
      .join("\n");

    // Full prompt: general project context + product info + user question
    const fullPrompt = `
${projectContext}
${productText}

User: ${prompt}
EcoAI:
    `;

    const result = await generateText(fullPrompt);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;
