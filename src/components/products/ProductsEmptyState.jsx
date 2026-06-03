import useTheme from "../../hooks/useTheme";

function ProductsEmptyState({ onResetFilters }) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg border p-10 text-center ${
        theme === "dark"
          ? "bg-slate-900 border-white/10"
          : "bg-white border-black/5"
      }`}
    >
      <h2 className="text-2xl font-bold">No encontramos productos</h2>
      <p
        className={`mt-3 ${
          theme === "dark" ? "text-slate-300" : "text-slate-500"
        }`}
      >
        Proba con otra busqueda, categoria o rango de precios.
      </p>

      <button
        onClick={onResetFilters}
        className="mt-6 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

export default ProductsEmptyState;
