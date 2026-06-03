import LoadingSkeleton from "../LoadingSkeleton";

function ProductsLoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductsLoadingGrid;
