import { FaFilter, FaRotateLeft } from "react-icons/fa6";

import SearchBar from "../SearchBar";

function ProductFilters({
  filterOptions,
  filters,
  onFilterChange,
  onResetFilters,
  resultsCount,
}) {
  return (
    <div className="mb-12 rounded-lg border border-[#d7e3d2] bg-white p-5 shadow-sm md:p-7">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#102116] text-white">
            <FaFilter />
          </span>
          <div>
            <h2 className="text-xl font-extrabold">Filtros</h2>
            <p className="text-sm text-[#667369]">
              {resultsCount} productos encontrados
            </p>
          </div>
        </div>

        <button
          onClick={onResetFilters}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d7e3d2] px-4 py-3 font-bold text-[#102116] transition hover:border-[#1f7a3a] hover:text-[#1f7a3a]"
        >
          <FaRotateLeft />
          Limpiar
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <SearchBar
          search={filters.search}
          setSearch={(value) => onFilterChange("search", value)}
        />

        <FilterSelect
          label="Seccion"
          value={filters.audience}
          onChange={(value) => onFilterChange("audience", value)}
          options={filterOptions.audiences}
          allLabel="Hombre, mujer y kids"
        />

        <FilterSelect
          label="Subseccion"
          value={filters.group}
          onChange={(value) => onFilterChange("group", value)}
          options={filterOptions.groups}
          allLabel="Indumentaria, calzado y accesorios"
        />

        <FilterSelect
          label="Tipo"
          value={filters.type}
          onChange={(value) => onFilterChange("type", value)}
          options={filterOptions.types}
          allLabel="Botines, zapatillas, ojotas..."
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="Marca"
          value={filters.brand}
          onChange={(value) => onFilterChange("brand", value)}
          options={filterOptions.brands}
          allLabel="Todas las marcas"
        />

        <FilterSelect
          label="Deporte"
          value={filters.sport}
          onChange={(value) => onFilterChange("sport", value)}
          options={filterOptions.sports}
          allLabel="Todos los deportes"
        />

        <select
          value={filters.promo}
          onChange={(e) => onFilterChange("promo", e.target.value)}
          className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 text-[#111813] outline-none transition focus:border-[#1f7a3a]"
        >
          <option value="all">Todo el catalogo</option>
          <option value="launch">Lanzamientos</option>
          <option value="sale">Sale</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 text-[#111813] outline-none transition focus:border-[#1f7a3a]"
        >
          <option value="featured">Destacados primero</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:max-w-xl">
        <input
          type="number"
          min="0"
          placeholder="Precio minimo"
          value={filters.minPrice}
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 text-[#111813] outline-none transition focus:border-[#1f7a3a]"
        />

        <input
          type="number"
          min="0"
          placeholder="Precio maximo"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 text-[#111813] outline-none transition focus:border-[#1f7a3a]"
        />
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options, allLabel }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 capitalize text-[#111813] outline-none transition focus:border-[#1f7a3a]"
    >
      <option value="all">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default ProductFilters;
