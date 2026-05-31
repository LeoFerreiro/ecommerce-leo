import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { getProduct } from "../services/api";

import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { theme } = useTheme();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id);
      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div
        className={`
          min-h-screen
          flex items-center justify-center
          ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }
        `}
      >
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            rounded-[40px]
            p-20
            transition-colors duration-300

            ${
              theme === "dark"
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-black/5"
            }
          `}
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              w-full
              h-[500px]
              object-contain
            "
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className={
              theme === "dark"
                ? "text-violet-400 capitalize"
                : "text-violet-600 capitalize"
            }
          >
            {product.category}
          </p>

          <h1
            className={`
              text-5xl
              font-bold
              mt-4
              leading-tight

              ${
                theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {product.title}
          </h1>

          <p
            className={`
              text-lg
              leading-8
              mt-8

              ${
                theme === "dark"
                  ? "text-gray-300"
                  : "text-gray-500"
              }
            `}
          >
            {product.description}
          </p>

          <div className="mt-10">
            <span
              className={`
                text-5xl
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
          </div>

          <button
            onClick={() => addToCart(product)}
            className="
              mt-10
              px-10 py-5
              rounded-2xl
              bg-violet-600
              hover:bg-violet-700
              text-white
              transition
              font-semibold
            "
          >
            Agregar al carrito
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default ProductDetails;