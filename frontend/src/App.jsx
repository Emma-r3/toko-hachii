import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import RouteTracker from "./components/RouteTracker.jsx";

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <RouteTracker />
      <header className="nav">
        <Link to="/" className="brand">
          <img src="/images/logo.jpg" alt="Logo Toko Hachii" className="brand-logo" />
          <span>Toko Hachii</span>
        </Link>
        <nav>
          <NavLink to="/" end>Beranda</NavLink>
          <NavLink to="/products">Produk</NavLink>
          {user ? (
            <>
              <span className="nav-user">Halo, {user.name}</span>
              <button className="btn-link" onClick={handleLogout}>Keluar</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Masuk</NavLink>
              <NavLink to="/register">Daftar</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}