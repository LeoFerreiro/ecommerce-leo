import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

import useModalDialog from "../../hooks/useModalDialog";
import ProductFilters from "./ProductFilters";

function CatalogFilters({ isOpen, onClose, resultsCount, fallbackFocusRef, ...filterProps }) {
  const dialogRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = (event) => setIsDesktop(event.matches);
    desktop.addEventListener("change", handleResize);
    return () => desktop.removeEventListener("change", handleResize);
  }, []);

  useModalDialog(dialogRef, isOpen && !isDesktop, onClose, fallbackFocusRef);

  if (isDesktop) return <ProductFilters {...filterProps} />;

  return (
    <dialog
      ref={dialogRef}
      id="catalog-filter-drawer"
      className="catalog-filter-drawer"
      aria-labelledby="catalog-drawer-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="catalog-drawer-heading">
        <h2 id="catalog-drawer-title">Filtros</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar filtros" title="Cerrar filtros">
          <FaTimes aria-hidden="true" />
        </button>
      </div>
      <ProductFilters {...filterProps} inDrawer />
      <p className="catalog-drawer-count" role="status" aria-live="polite" aria-atomic="true">
        {resultsCount} productos encontrados
      </p>
    </dialog>
  );
}

export default CatalogFilters;
