import { Link } from "react-router-dom";

import products from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-semibold text-violet-600">Destacados</p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Productos populares
          </h2>
        </div>

        <Link
          to="/products"
          className="hidden rounded-lg border border-black/10 px-6 py-3 font-semibold transition hover:border-violet-600 hover:text-violet-600 md:block"
        >
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
