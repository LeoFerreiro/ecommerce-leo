import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { getProduct } from "../services/api";

import useCart from "../hooks/useCart";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

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
      <div className="min-h-screen flex items-center justify-center">
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
          className="bg-white rounded-[40px]
          border border-black/5
          p-20"
        >

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-contain"
          />

        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <p className="text-violet-600 capitalize">
            {product.category}
          </p>

          <h1
            className="text-5xl font-bold
            mt-4 leading-tight"
          >
            {product.title}
          </h1>

          <p
            className="text-gray-500
            text-lg leading-8 mt-8"
          >
            {product.description}
          </p>

          <div className="mt-10">

            <span className="text-5xl font-bold">
              ${product.price}
            </span>

          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-10
            px-10 py-5 rounded-2xl
            bg-violet-600 hover:bg-violet-700
            text-white transition
            font-semibold"
          >
            Agregar al carrito
          </button>

        </motion.div>

      </div>

    </section>
  );
}

export default ProductDetails;