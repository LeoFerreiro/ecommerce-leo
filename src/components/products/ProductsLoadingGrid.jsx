import LoadingSkeleton from "../LoadingSkeleton";

function ProductsLoadingGrid() {
  return (
    <div className="products-grid" role="status" aria-label="Cargando productos" aria-busy="true">
      {[...Array(8)].map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductsLoadingGrid;
