import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "../../styles/page-state.css";

function PageEmptyState({ title, description, label }) {
  return (
    <main className="section-shell page-state">
      <div role="status" aria-atomic="true">
        {label && <p className="page-state-label">{label}</p>}
        <h1>{title}</h1>
        <p className="page-state-description">{description}</p>
      </div>
      <Link to="/products" className="page-state-link">
        Volver al catalogo <FaArrowRight aria-hidden="true" />
      </Link>
    </main>
  );
}

export default PageEmptyState;
