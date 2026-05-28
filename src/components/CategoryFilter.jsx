function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {

  return (
    <div className="flex flex-wrap gap-4 mb-10">

      <button
        onClick={() => setSelectedCategory("all")}
        className={`
          px-6 py-3 rounded-full transition
          ${
            selectedCategory === "all"
              ? "bg-violet-600 text-white"
              : "bg-white border border-black/5 hover:border-violet-600"
          }
        `}
      >
        All
      </button>

      {categories.map((category) => (

        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`
            px-6 py-3 rounded-full transition capitalize
            ${
              selectedCategory === category
                ? "bg-violet-600 text-white"
                : "bg-white border border-black/5 hover:border-violet-600"
            }
          `}
        >
          {category}
        </button>

      ))}

    </div>
  );
}

export default CategoryFilter;