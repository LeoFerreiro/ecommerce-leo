import { Link } from "react-router-dom";

import products from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.isLaunch).slice(0, 4);

  return (
    <section className="section-shell section-stack">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 font-semibold text-[#1f7a3a]">Lanzamientos</p>

          <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.15] md:text-5xl">
            Lo nuevo para entrenar y salir
          </h2>
        </div>

        <Link
          to="/products?promo=launch"
          className="w-fit rounded-lg border border-[#102116] px-6 py-3 font-bold text-[#102116] transition hover:bg-[#102116] hover:text-white"
        >
          Ver lanzamientos
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
