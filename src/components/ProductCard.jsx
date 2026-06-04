import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`} className="h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-[#d7e3d2] bg-white shadow-sm transition hover:shadow-xl"
      >
        <div className="relative h-72 overflow-hidden bg-[#e8f3e5]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isLaunch && (
              <span className="rounded-full bg-[#59c36a] px-3 py-1 text-xs font-bold text-[#102116]">
                Nuevo
              </span>
            )}
            {product.isSale && (
              <span className="rounded-full bg-[#102116] px-3 py-1 text-xs font-bold text-white">
                Sale
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between gap-3 text-xs font-bold uppercase text-[#1f7a3a]">
            <span>{product.brand}</span>
            <span>{product.sport}</span>
          </div>

          <p className="text-sm font-semibold capitalize text-[#667369]">
            {product.audience} / {product.group} / {product.type}
          </p>

          <h2 className="mt-3 line-clamp-2 text-base font-bold text-[#111813]">
            {product.title}
          </h2>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="space-y-1">
              {product.originalPrice && (
                <p className="text-sm font-semibold text-[#8c978f] line-through">
                  ${product.originalPrice}
                </p>
              )}
              <p className="text-2xl font-extrabold text-[#102116]">
                ${product.price}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#102116] text-white transition hover:bg-[#1f7a3a]"
            >
              <FaShoppingBag />
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default ProductCard;
