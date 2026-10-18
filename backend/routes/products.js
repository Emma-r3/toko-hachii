const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id)
    ? next()
    : res.status(400).json({ message: "ID tidak valid" });

router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", validId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/:id", validId, auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", validId, auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ message: "Produk dihapus" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;