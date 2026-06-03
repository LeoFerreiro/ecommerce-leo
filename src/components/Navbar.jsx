import { FaChevronDown, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { mainNavigationItems } from "../config/navigation";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Navbar() {
  const { totalItems, openCart } = useCart();
  const { user, logoutUser } = useAuth();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#dfe8d7] bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-3">
          <Link to="/" className="text-2xl font-extrabold text-[#0f1f16]">
            Verde<span className="text-[#1f7a3a]">Sport</span>
          </Link>

          <nav className="hidden items-stretch gap-1 text-sm font-semibold text-[#1f2a22] lg:flex">
            {mainNavigationItems.map((item) => (
              <NavDropdown key={item.label} item={item} />
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
      </div>
    </header>
  );
}

function NavDropdown({ item }) {
  return (
    <div className="group relative flex items-center">
      <Link
        to={item.to}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-3 transition hover:bg-[#e8f3e5] hover:text-[#1f7a3a] focus:bg-[#e8f3e5] focus:text-[#1f7a3a]"
      >
        {item.label}
        {item.columns?.length > 0 && <FaChevronDown className="text-xs" />}
      </Link>

      {item.columns?.length > 0 && (
        <div className="invisible absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="grid gap-6 rounded-lg border border-[#d7e3d2] bg-white p-6 shadow-2xl md:grid-cols-3">
            {item.columns.map((column) => (
              <div key={column.title}>
                <Link
                  to={column.to}
                  className="mb-3 block text-sm font-extrabold uppercase tracking-wide text-[#102116] transition hover:text-[#1f7a3a]"
                >
                  {column.title}
                </Link>

                <div className="grid gap-2">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="rounded-md px-2 py-2 text-sm font-semibold text-[#667369] transition hover:bg-[#e8f3e5] hover:text-[#1f7a3a]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
