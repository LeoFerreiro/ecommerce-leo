import { Link } from "react-router-dom";

import { footerNavigationLinks } from "../config/navigation";

function Footer() {
  return (
    <footer className="store-footer">
      <div className="section-shell footer-layout">
        <div>
          <p className="text-xl font-extrabold text-[#102116]">
            Verde<span className="text-[#1f7a3a]">Sport</span>
          </p>
          <p className="mt-1 text-sm text-[#667369]">
            Indumentaria deportiva demo - 2026.
          </p>
        </div>

        <nav className="footer-links" aria-label="Navegacion del pie de pagina">
          {footerNavigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-[#1f7a3a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
