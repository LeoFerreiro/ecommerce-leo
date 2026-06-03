import useTheme from "../../hooks/useTheme";

function ProductsHeader() {
  const { theme } = useTheme();

  return (
    <div className="mb-10">
      <p className="font-semibold text-violet-600">Catalogo</p>

      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        Nuestra coleccion
      </h1>

      <p
        className={`mt-4 max-w-2xl text-base leading-7 ${
          theme === "dark" ? "text-slate-300" : "text-slate-600"
        }`}
      >
        Busca por nombre, categoria o descripcion. Tambien podes ordenar por
        precio y definir un rango para encontrar productos mas rapido.
      </p>
    </div>
  );
}

export default ProductsHeader;
