import { FaFilter, FaRotateLeft } from "react-icons/fa6";

import SearchBar from "../SearchBar";
import useTheme from "../../hooks/useTheme";

function ProductFilters({
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  resultsCount,
}) {
  const { theme } = useTheme();

  const controlClass =
    theme === "dark"
      ? "bg-slate-900 border-white/10 text-white"
      : "bg-white border-black/5 text-slate-900";

  return (
    <div
      className={`mb-10 rounded-lg border p-4 shadow-sm md:p-5 ${controlClass}`}
    >
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white">
            <FaFilter />
          </span>
          <div>
            <h2 className="text-xl font-bold">Filtros</h2>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {resultsCount} productos encontrados
            </p>
          </div>
        </div>

        <button
          onClick={onResetFilters}
          className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-semibold transition ${
            theme === "dark"
              ? "border-white/10 hover:border-violet-500"
              : "border-slate-200 hover:border-violet-500"
          }`}
        >
          <FaRotateLeft />
          Limpiar
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <SearchBar
          search={filters.search}
          setSearch={(value) => onFilterChange("search", value)}
        />

        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className={`rounded-lg border px-4 py-4 outline-none transition focus:border-violet-600 ${controlClass}`}
        >
          <option value="all">Todas las categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className={`rounded-lg border px-4 py-4 outline-none transition focus:border-violet-600 ${controlClass}`}
        >
          <option value="featured">Orden destacado</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
        <input
          type="number"
          min="0"
          placeholder="Precio minimo"
          value={filters.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          className={`rounded-lg border px-4 py-4 outline-none transition focus:border-violet-600 ${controlClass}`}
        />

        <input
          type="number"
          min="0"
          placeholder="Precio maximo"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          className={`rounded-lg border px-4 py-4 outline-none transition focus:border-violet-600 ${controlClass}`}
        />
      </div>
    </div>
  );
}

export default ProductFilters;
