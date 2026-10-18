import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/products", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mendaftar. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Daftar Akun</h2>
      {error && <p className="error">{error}</p>}
      <label>Nama</label>
      <input type="text" name="name" value={form.name} onChange={onChange} required />
      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={onChange} required />
      <label>Password (minimal 6 karakter)</label>
      <PasswordInput name="password" value={form.password} onChange={onChange} minLength={6} />
      <button className="btn" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</button>
      <p>Sudah punya akun? <Link to="/login">Masuk di sini</Link></p>
    </form>
  );
}