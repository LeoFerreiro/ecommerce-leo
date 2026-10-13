import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

function CatalogToolbar({ filters, onFilterChange, resultsCount, isFiltersOpen, onOpenFilters, searchInputRef }) {
  return (
    <div className="catalog-toolbar">
      <label className="catalog-search catalog-field">
        <span>Buscar productos</span>
        <div className="catalog-search-control">
          <FaSearch aria-hidden="true" />
          <input ref={searchInputRef} type="search" placeholder="Buscar indumentaria, marcas, deportes..." value={filters.search} onChange={(e) => onFilterChange("search", e.target.value)} />
        </div>
      </label>
      <button
        className="catalog-filters-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-controls="catalog-filter-drawer"
        aria-expanded={isFiltersOpen}
        onClick={onOpenFilters}
      >
        <FaFilter aria-hidden="true" />Filtros
      </button>
      <p className="catalog-count" role="status" aria-live="polite" aria-atomic="true">
        <strong>{resultsCount}</strong> productos encontrados
      </p>
      <div className="catalog-sort catalog-field">
        <label htmlFor="catalog-sort">Ordenar por</label>
        <select id="catalog-sort" value={filters.sort} onChange={(e) => onFilterChange("sort", e.target.value)}>
          <option value="featured">Destacados primero</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>
    </div>
  );
}

export default CatalogToolbar;
