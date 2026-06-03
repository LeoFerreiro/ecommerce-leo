function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-4">
      <button
        onClick={() => setSelectedCategory("all")}
        className={`rounded-lg px-6 py-3 font-bold transition ${
          selectedCategory === "all"
            ? "bg-[#102116] text-white"
            : "border border-[#d7e3d2] bg-white text-[#102116] hover:border-[#1f7a3a]"
        }`}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-lg px-6 py-3 font-bold capitalize transition ${
            selectedCategory === category
              ? "bg-[#102116] text-white"
              : "border border-[#d7e3d2] bg-white text-[#102116] hover:border-[#1f7a3a]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
