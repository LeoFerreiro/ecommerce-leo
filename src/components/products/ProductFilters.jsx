import { FaFilter, FaRotateLeft } from "react-icons/fa6";

const selectFields = [
  ["audience", "Seccion", "audiences", "Hombre, mujer y kids"],
  ["group", "Subseccion", "groups", "Indumentaria, calzado y accesorios"],
  ["type", "Tipo", "types", "Botines, zapatillas, ojotas..."],
  ["brand", "Marca", "brands", "Todas las marcas"],
  ["sport", "Deporte", "sports", "Todos los deportes"],
];

function ProductFilters({ filterOptions, filters, onFilterChange, onResetFilters, inDrawer = false }) {
  return (
    <aside className="catalog-filters" aria-labelledby={inDrawer ? "catalog-drawer-title" : "catalog-filters-title"}>
      <div className="catalog-filters-heading">
        {!inDrawer && <h2 id="catalog-filters-title"><FaFilter aria-hidden="true" />Filtros</h2>}
        <button type="button" onClick={onResetFilters}>
          <FaRotateLeft aria-hidden="true" />Limpiar
        </button>
      </div>
      <div className="catalog-filter-fields">
        {selectFields.map(([key, label, optionsKey, allLabel]) => (
          <div className="catalog-field" key={key}>
            <label htmlFor={`catalog-filter-${key}`}>{label}</label>
            <select id={`catalog-filter-${key}`} value={filters[key]} onChange={(e) => onFilterChange(key, e.target.value)}>
              <option value="all">{allLabel}</option>
              {filterOptions[optionsKey].map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        ))}
        <div className="catalog-field">
          <label htmlFor="catalog-filter-promo">Promo</label>
          <select id="catalog-filter-promo" value={filters.promo} onChange={(e) => onFilterChange("promo", e.target.value)}>
            <option value="all">Todo el catalogo</option>
            <option value="launch">Lanzamientos</option>
            <option value="sale">Sale</option>
          </select>
        </div>
      </div>
      <fieldset className="catalog-price-fields">
        <legend>Precio</legend>
        <label className="catalog-field">
          <span>Precio minimo</span>
          <input type="number" min="0" placeholder="Precio minimo" value={filters.minPrice} onChange={(e) => onFilterChange("minPrice", e.target.value)} />
        </label>
        <label className="catalog-field">
          <span>Precio maximo</span>
          <input type="number" min="0" placeholder="Precio maximo" value={filters.maxPrice} onChange={(e) => onFilterChange("maxPrice", e.target.value)} />
        </label>
      </fieldset>
    </aside>
  );
}

export default ProductFilters;
