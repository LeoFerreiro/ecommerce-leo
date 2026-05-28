import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../hooks/useCart";

function Navbar() {

  const { totalItems,openCart,} = useCart();


  return (
    <nav
      className="fixed top-0 left-0 w-full z-50
      bg-[#F8FAFC]/90 backdrop-blur-md
      border-b border-black/5"
    >
      <div
         className="max-w-7xl w-full mx-auto h-16
         px-6 flex items-center justify-between
         overflow-visible"
      >

        <Link
          to="/"
          className="text-2xl font-bold"
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
            onClick={openCart}
            className="
            relative
            text-2xl
            hover:text-violet-600
            transition
            "
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