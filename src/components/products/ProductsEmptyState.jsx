import { FaMagnifyingGlass, FaRotateLeft } from "react-icons/fa6";

function ProductsEmptyState({ onResetFilters }) {
  return (
    <div className="catalog-empty" role="status">
      <FaMagnifyingGlass className="catalog-empty-icon" aria-hidden="true" />
      <h2>No encontramos productos</h2>
      <p>
        Proba con otra seccion, marca, deporte o rango de precios.
      </p>

      <button
        onClick={onResetFilters}
        type="button"
      >
        <FaRotateLeft aria-hidden="true" />
        Limpiar filtros
      </button>
    </div>
  );
}

export default ProductsEmptyState;
