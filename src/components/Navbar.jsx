import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";

import { FaMoon, FaSun } from "react-icons/fa";

import useTheme from "../hooks/useTheme";

function Navbar() {
  const { totalItems,openCart,} = useCart();
 
  const {
  theme,
  toggleTheme,
} = useTheme();


  return (
    <nav
  className={`
    fixed top-0 left-0 w-full z-50
    backdrop-blur-md
    transition-colors duration-300
    ${
      theme === "dark"
        ? "bg-slate-900/90 border-b border-white/10 text-white"
        : "bg-[#F8FAFC]/90 border-b border-black/5 text-slate-900"
    }
  `}
>
      <div
         className="max-w-7xl w-full mx-auto h-16
         px-6 flex items-center justify-between
         overflow-visible"
      >

        <Link
          to="/"
          className={`
          text-2xl
          font-bold
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

        <div className="flex items-center gap-6 shrink-0">

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