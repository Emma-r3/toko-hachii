const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const makeToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email });

// REGISTRASI
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
    if (String(password).length < 6)
      return res.status(400).json({ message: "Password minimal 6 karakter" });

    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email sudah terdaftar" });

    const hashed = await bcrypt.hash(String(password), 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email dan password wajib diisi" });

    const user = await User.findOne({ email: String(email).toLowerCase() });
    const ok = user && (await bcrypt.compare(String(password), user.password));
    if (!ok) return res.status(401).json({ message: "Email atau password salah" });

    res.json({ token: makeToken(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// DATA USER YANG SEDANG LOGIN
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(publicUser(user));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;