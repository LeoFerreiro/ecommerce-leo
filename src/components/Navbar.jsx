import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import useCart from "../hooks/useCart";

import { FaMoon, FaSun } from "react-icons/fa";

import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { totalItems,openCart,} = useCart();
  const { user, logoutUser } = useAuth();
 
  const {
  theme,
  toggleTheme,
} = useTheme();


  return (
    <nav
  className={`
    fixed top-0 left-0 w-full z-50
    backdrop-blur-xl
    transition-colors duration-300
    ${
      theme === "dark"
        ? "bg-slate-900/90 border-b border-white/10 text-white"
        : "bg-[#F8FAFC]/90 border-b border-black/5 text-slate-900"
    }
  `}
>
      <div
         className="max-w-7xl w-full mx-auto min-h-16
         px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3
         overflow-visible"
      >

        <Link
          to="/"
          className={`
          text-2xl
          font-extrabold
          transition-colors
          ${
            theme === "dark"
            ? "text-white"
            : "text-slate-900"
          }
          `}
        >
          Leo
          <span className="text-violet-600">
            Store
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-sm sm:text-base">

          <Link
            to="/"
            className="hover:text-violet-600 transition"
          >
            Inicio
          </Link>

          <Link
            to="/products"
            className="hover:text-violet-600 transition"
          >
            Productos
          </Link>

          <Link
            to="/registro"
            className={`
              inline-flex items-center gap-2 rounded-lg border px-3 py-2
              font-semibold transition
              ${
                user
                  ? theme === "dark"
                    ? "border-white/10 text-slate-200 hover:border-violet-500"
                    : "border-slate-200 text-slate-700 hover:border-violet-500"
                  : "border-violet-600 bg-violet-600 text-white hover:bg-violet-700"
              }
            `}
          >
            <FaUserCircle />
            <span className="hidden sm:inline">
              {user ? user.name.split(" ")[0] : "Registrarse"}
            </span>
          </Link>

          {user && (
            <button
              onClick={logoutUser}
              className="hidden lg:inline text-sm text-slate-500 transition hover:text-violet-600"
            >
              Salir
            </button>
          )}

          <button
              onClick={toggleTheme}
              className={`
              text-xl
              transition
              hover:text-violet-600
              ${
                theme === "dark"
                ? "text-yellow-400"
                : "text-slate-700"
                }
              `}
              >
              {theme === "dark"
                ? <FaSun />
                : <FaMoon />
              }
            </button>

          <button
            onClick={openCart}
            className={`
            relative
            text-2xl
            transition
            hover:text-violet-600
            ${
              theme === "dark"
              ? "text-white"
              : "text-slate-900"
            }
          `}
          >

          <FaShoppingCart />

            {totalItems > 0 && (

          <span
            className="
            absolute
            -top-2 -right-2
            w-5 h-5
            rounded-full
            bg-violet-600
            text-white
            text-xs
            flex items-center justify-center
            "
          >
            {totalItems}
          </span>

          )}

          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
