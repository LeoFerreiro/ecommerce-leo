import products from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Header */}
      <div className="flex items-end justify-between mb-14">

        <div>

          <p className="text-violet-600 font-medium">
            Destacados
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Productos populares
          </h2>

        </div>

        <button
          className="hidden md:block
          border border-black/10
          px-6 py-3 rounded-full
          hover:border-violet-600
          hover:text-violet-600
          transition"
        >
          Ver todos
        </button>

      </div>

      {/* Grid */}
      <div
        className="grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8"
      >

        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;