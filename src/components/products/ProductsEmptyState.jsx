function ProductsEmptyState({ onResetFilters }) {
  return (
    <div className="rounded-lg border border-[#d7e3d2] bg-white p-10 text-center">
      <h2 className="text-2xl font-extrabold">No encontramos productos</h2>
      <p className="mt-3 text-[#667369]">
        Proba con otra seccion, marca, deporte o rango de precios.
      </p>

      <button
        onClick={onResetFilters}
        className="mt-6 rounded-lg bg-[#102116] px-6 py-3 font-bold text-white transition hover:bg-[#1f7a3a]"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

export default ProductsEmptyState;
