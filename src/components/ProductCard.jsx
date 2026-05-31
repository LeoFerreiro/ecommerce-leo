import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

function ProductCard({ product }) {
  const { theme } = useTheme();
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-3xl
          overflow-hidden
          p-5
          h-full
          flex flex-col
          transition-all duration-300
          shadow-lg

          ${
            theme === "dark"
              ? "bg-slate-900 border border-white/10"
              : "bg-white border border-black/5"
          }
        `}
      >
        {/* Image */}
        <div
          className={`
            h-64
            rounded-2xl
            p-4
            flex items-center justify-center

            ${
              theme === "dark"
                ? "bg-slate-800"
                : "bg-gray-100"
            }
          `}
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              w-full
              h-full
              object-contain
            "
          />
        </div>

        {/* Info */}
        <div className="mt-6 flex-1 flex flex-col">
          <p
            className={
              theme === "dark"
                ? "text-violet-400 text-sm"
                : "text-violet-600 text-sm"
            }
          >
            {product.category}
          </p>

          <h2
            className={`
              text-lg
              font-semibold
              mt-2
              line-clamp-2

              ${
                theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {product.title}
          </h2>

          <div
            className="
              flex items-center
              justify-between
              mt-auto
              pt-6
            "
          >
            <span
              className={`
                text-2xl
                font-bold

                ${
                  theme === "dark"
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              ${product.price}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="
                w-12 h-12
                rounded-full
                bg-violet-600
                hover:bg-violet-700
                text-white
                flex items-center justify-center
                transition
              "
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;