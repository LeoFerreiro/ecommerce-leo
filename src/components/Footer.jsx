import { Link } from "react-router-dom";

import { footerNavigationLinks } from "../config/navigation";

function Footer() {
  return (
    <footer className="border-t border-[#d7e3d2] bg-white py-10">
      <div className="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-extrabold text-[#102116]">
            Verde<span className="text-[#1f7a3a]">Sport</span>
          </p>
          <p className="mt-1 text-sm text-[#667369]">
            Indumentaria deportiva demo - 2026.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-bold text-[#667369]">
          {footerNavigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-[#1f7a3a]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
