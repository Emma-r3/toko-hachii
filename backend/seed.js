const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const data = [
  { name: "Kemeja Linen Putih", description: "Kemeja linen adem untuk harian.", price: 189000, stock: 25, category: "Pakaian", image: "/images/shirt.jpg" },
  { name: "Sepatu Sneakers Canvas", description: "Sneakers ringan dengan sol karet.", price: 325000, stock: 12, category: "Sepatu", image: "/images/sneakers.jpg" },
  { name: "Tas Ransel Urban", description: "Ransel 20L tahan percikan air.", price: 275000, stock: 18, category: "Tas", image: "/images/backpack.jpg" },
  { name: "Jam Tangan Minimalis", description: "Jam analog strap kulit.", price: 450000, stock: 8, category: "Aksesoris", image: "/images/wristwatch.jpg" },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(data);
    console.log(`${data.length} produk dimasukkan`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });