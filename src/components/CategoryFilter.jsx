import useTheme from "../hooks/useTheme";

function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap gap-4 mb-10">
      <button
        onClick={() => setSelectedCategory("all")}
        className={`
          px-6 py-3
          rounded-full
          transition

          ${
            selectedCategory === "all"
              ? "bg-violet-600 text-white"
              : theme === "dark"
              ? "bg-slate-900 border border-white/10 text-gray-200 hover:border-violet-600"
              : "bg-white border border-black/5 text-slate-900 hover:border-violet-600"
          }
        `}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            px-6 py-3
            rounded-full
            transition
            capitalize

            ${
              selectedCategory === category
                ? "bg-violet-600 text-white"
                : theme === "dark"
                ? "bg-slate-900 border border-white/10 text-gray-200 hover:border-violet-600"
                : "bg-white border border-black/5 text-slate-900 hover:border-violet-600"
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