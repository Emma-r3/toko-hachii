const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "API Toko Online berjalan" }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB terhubung");
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error("Gagal konek MongoDB:", e.message);
    process.exit(1);
  });