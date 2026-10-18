import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api.js";
import { trackEvent } from "../analytics.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProduct(id)
      .then((data) => setP(data))
      .catch(() => setError("Produk tidak ditemukan."));
  }, [id]);

  useEffect(() => {
    if (p) trackEvent("view_item", { item_id: p._id, item_name: p.name });
  }, [p]);

  if (error) return <p>{error} <Link to="/products">Kembali</Link></p>;
  if (!p) return <p>Memuat...</p>;

  return (
    <>
      <Link to="/products">← Kembali ke daftar</Link>
      <div className="detail">
        <img src={p.image} alt={p.name} />
        <div>
          <span className="tag">{p.category}</span>
          <h1>{p.name}</h1>
          <p className="price">Rp {p.price.toLocaleString("id-ID")}</p>
          <p>{p.description}</p>
          <p>Stok: {p.stock > 0 ? `${p.stock} tersedia` : "Habis"}</p>
          <button className="btn" disabled={p.stock === 0}>Tambah ke keranjang</button>
        </div>
      </div>
    </>
  );
}