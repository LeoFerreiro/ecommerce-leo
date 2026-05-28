import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { totalItems } = useCart();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50
      bg-white/80 backdrop-blur-md
      border-b border-black/5"
    >
      <div
         className="max-w-7xl w-full mx-auto
         px-6 py-5 flex items-center justify-between
         overflow-hidden"
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

          <Link
            to="/cart"
            className="relative text-2xl
            hover:text-violet-600 transition
            flex items-center justify-center
            w-10 h-10"
          >

            <FaShoppingCart />

              {totalItems > 0 && (

                <span
                  className="absolute -top-1 -right-1
                  bg-violet-600 text-white
                  text-[10px] w-5 h-5 rounded-full
                  flex items-center justify-center
                  font-semibold"
                >
              {totalItems}
                </span>

                )}

            </Link>     

        </div>
      </div>
    </nav>
  );
}

export default Navbar;