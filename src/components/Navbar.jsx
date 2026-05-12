import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50
      bg-white/80 backdrop-blur-md
      border-b border-black/5"
    >
      <div
        className="max-w-7xl mx-auto
        px-6 py-5 flex items-center justify-between"
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

        <div className="flex items-center gap-8">

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
            className="text-2xl hover:text-violet-600 transition"
          >
            <FaShoppingCart />
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;