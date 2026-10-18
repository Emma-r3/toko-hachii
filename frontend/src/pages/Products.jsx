import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Gagal memuat produk. Pastikan backend sudah berjalan."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Memuat produk...</p>;
  if (error) return <p style={{ color: "#b42318" }}>{error}</p>;
  if (products.length === 0) return <p>Belum ada produk.</p>;

  return (
    <>
      <h2>Daftar Produk</h2>
      <div className="grid">
        {products.map((p) => (
          <Link to={`/products/${p._id}`} className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <div className="card-body">
              <span className="tag">{p.category}</span>
              <h3>{p.name}</h3>
              <strong>Rp {p.price.toLocaleString("id-ID")}</strong>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}