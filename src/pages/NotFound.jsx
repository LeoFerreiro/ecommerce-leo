import PageEmptyState from "../components/common/PageEmptyState";

function NotFound() {
  return (
    <PageEmptyState
      label="404"
      title="Pagina no encontrada"
      description="La direccion que ingresaste no corresponde a una pagina de VerdeSport."
    />
  );
}

export default NotFound;
