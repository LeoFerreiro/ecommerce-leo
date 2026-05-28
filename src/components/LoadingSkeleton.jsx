function LoadingSkeleton() {
  return (
    <div
      className="bg-white rounded-3xl
      border border-black/5 p-5
      animate-pulse"
    >

      {/* Image */}
      <div
        className="bg-gray-200
        h-[250px] rounded-2xl"
      />

      {/* Text */}
      <div className="mt-6">

        <div
          className="h-4 bg-gray-200
          rounded w-24"
        />

        <div
          className="h-6 bg-gray-200
          rounded w-full mt-4"
        />

        <div
          className="h-6 bg-gray-200
          rounded w-2/3 mt-3"
        />

        {/* Footer */}
        <div
          className="flex items-center
          justify-between mt-8"
        >

          <div
            className="h-8 bg-gray-200
            rounded w-20"
          />

          <div
            className="w-12 h-12
            rounded-full bg-gray-200"
          />

        </div>

      </div>

    </div>
  );
}

export default LoadingSkeleton;