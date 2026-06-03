function LoadingSkeleton() {
  return (
    <div
      className="animate-pulse rounded-lg border border-[#d7e3d2] bg-white p-5"
    >

      {/* Image */}
      <div
        className="h-[250px] rounded-lg bg-[#dfe8d7]"
      />

      {/* Text */}
      <div className="mt-6">

        <div
          className="h-4 bg-[#dfe8d7]
          rounded w-24"
        />

        <div
          className="h-6 bg-[#dfe8d7]
          rounded w-full mt-4"
        />

        <div
          className="h-6 bg-[#dfe8d7]
          rounded w-2/3 mt-3"
        />

        {/* Footer */}
        <div
          className="flex items-center
          justify-between mt-8"
        >

          <div
            className="h-8 bg-[#dfe8d7]
            rounded w-20"
          />

          <div
            className="w-12 h-12
            rounded-lg bg-[#dfe8d7]"
          />

        </div>

      </div>

    </div>
  );
}

export default LoadingSkeleton;
