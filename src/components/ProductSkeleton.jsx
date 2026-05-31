function ProductSkeleton() {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-4
      shadow-md
      animate-pulse
      "
    >
      <div className="h-48 bg-gray-200 rounded-xl mb-4" />

      <div className="h-4 bg-gray-200 rounded mb-2" />

      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />

      <div className="h-8 bg-gray-200 rounded" />
    </div>
  );
}

export default ProductSkeleton;