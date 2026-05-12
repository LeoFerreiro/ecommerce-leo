import products from "../data/products";
import ProductsGrid from "../components/ProductsGrid";

function Products() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="mb-14">

        <p className="text-blue-400">
          Productos
        </p>

        <h1 className="text-5xl font-bold mt-4">
          Nuestra colección
        </h1>

      </div>

      <ProductsGrid products={products} />

    </section>
  );
}

export default Products;