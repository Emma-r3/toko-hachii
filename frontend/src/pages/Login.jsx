import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/products", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal login. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Masuk</h2>
      {error && <p className="error">{error}</p>}
      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={onChange} required />
      <label>Password</label>
      <PasswordInput name="password" value={form.password} onChange={onChange} />
      <button className="btn" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</button>
      <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </form>
  );
}