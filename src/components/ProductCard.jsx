import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";

function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (

    <Link to={`/product/${product.id}`}>

      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-white
        border border-black/5
        rounded-3xl overflow-hidden
        p-5"
      >

        {/* Image */}
        <div
          className="bg-white rounded-2xl
          h-[250px] flex items-center justify-center p-6"
        >

          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />

        </div>

        {/* Info */}
        <div className="mt-6">

          <p className="text-violet-600 text-sm">
            {product.category}
          </p>

          <h2
            className="text-lg font-semibold
            mt-2 line-clamp-2"
          >
            {product.title}
          </h2>

          <div
            className="flex items-center
            justify-between mt-6"
          >

            <span className="text-2xl font-bold">
              ${product.price}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-12 h-12 rounded-full
              bg-violet-600 hover:bg-violet-700
              text-white
              flex items-center justify-center
              transition"
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