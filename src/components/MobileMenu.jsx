import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import { mainNavigationItems } from "../config/navigation";
import useModalDialog from "../hooks/useModalDialog";

function MobileMenu({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useModalDialog(dialogRef, isOpen, onClose);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      className="mobile-menu"
      aria-labelledby="mobile-menu-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.target === event.currentTarget &&
          (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)
        ) onClose();
      }}
    >
      <div className="mobile-menu-heading">
        <h2 id="mobile-menu-title">Navegacion principal</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar menu" title="Cerrar menu">
          <FaTimes aria-hidden="true" />
        </button>
      </div>
      <nav
        aria-label="Navegacion movil"
        onClick={(event) => {
          if (event.target.closest("a")) onClose();
        }}
      >
        {mainNavigationItems.map((item) => (
          <section className="mobile-menu-section" key={item.label}>
            <Link className="mobile-menu-category" to={item.to}>{item.label}</Link>
            <div className="mobile-menu-columns">
              {item.columns?.map((column) => (
                <div key={column.title}>
                  <Link className="mobile-menu-group" to={column.to}>{column.title}</Link>
                  {column.links.map((link) => (
                    <Link key={link.label} to={link.to}>{link.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </dialog>
  );
}

export default MobileMenu;
