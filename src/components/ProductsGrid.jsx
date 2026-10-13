import ProductCard from "./ProductCard";

function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductsGrid;
