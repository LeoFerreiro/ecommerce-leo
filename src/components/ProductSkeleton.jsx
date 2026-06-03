function ProductSkeleton() {
  return (
    <div
      className="
      bg-white
      rounded-lg
      p-4
      border border-[#d7e3d2]
      animate-pulse
      "
    >
      <div className="mb-4 h-48 rounded-lg bg-[#dfe8d7]" />

      <div className="mb-2 h-4 rounded bg-[#dfe8d7]" />

      <div className="mb-4 h-4 w-2/3 rounded bg-[#dfe8d7]" />

      <div className="h-8 rounded bg-[#dfe8d7]" />
    </div>
  );
}

export default ProductSkeleton;
