const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Nama wajib diisi"], trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: [true, "Harga wajib diisi"], min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, default: "Umum" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);