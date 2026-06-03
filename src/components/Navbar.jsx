import { Link } from "react-router-dom";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";

import {
  mainNavigationLinks,
  quickNavigationLinks,
} from "../config/navigation";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Navbar() {
  const { totalItems, openCart } = useCart();
  const { user, logoutUser } = useAuth();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#dfe8d7] bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
          <Link to="/" className="text-2xl font-extrabold text-[#0f1f16]">
            Verde<span className="text-[#1f7a3a]">Sport</span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-[#1f2a22] lg:flex">
            {mainNavigationLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="transition hover:text-[#1f7a3a]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 rounded-lg border border-[#d7e3d2] px-3 py-2 font-semibold text-[#1f2a22] transition hover:border-[#1f7a3a] hover:text-[#1f7a3a]"
            >
              <FaUserCircle />
              <span className="hidden sm:inline">
                {user ? user.name.split(" ")[0] : "Cuenta"}
              </span>
            </Link>

            {user && (
              <button
                onClick={logoutUser}
                className="hidden text-sm font-semibold text-[#667369] transition hover:text-[#1f7a3a] md:inline"
              >
                Salir
              </button>
            )}

            <button
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[#102116] text-white transition hover:bg-[#1f7a3a]"
            >
              <FaShoppingBag />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#59c36a] text-xs font-bold text-[#102116]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="flex gap-3 overflow-x-auto border-t border-[#edf2e8] py-2 text-xs font-semibold text-[#667369]">
          {quickNavigationLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="shrink-0 rounded-full px-3 py-1 transition hover:bg-[#e8f3e5] hover:text-[#1f7a3a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
