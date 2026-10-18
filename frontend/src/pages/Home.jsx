import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <h1>Belanja yang sedang trending harian, tanpa ribet.</h1>
      <p>Pilih dari koleksi produk pilihan kami yang selalu trending.</p>
      <Link to="/products" className="btn">Lihat semua produk</Link>
    </section>
  );
}