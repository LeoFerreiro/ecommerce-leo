import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import useCart from "../hooks/useCart";
import { getProduct } from "../services/api";

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
      <div className="flex min-h-screen items-center justify-center text-[#111813]">
        Cargando producto...
      </div>
    );
  }

  return (
    <section className="section-shell py-20">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg border border-[#d7e3d2] bg-white"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-[560px] w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-bold uppercase text-[#1f7a3a]">
            {product.brand} / {product.sport}
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-5 text-lg capitalize text-[#667369]">
            {product.audience} / {product.group} / {product.type} /{" "}
            {product.category}
          </p>

          <p className="mt-8 text-lg leading-8 text-[#4b574f]">
            {product.description}
          </p>

          <div className="mt-10 flex items-end gap-4">
            {product.originalPrice && (
              <span className="text-2xl font-bold text-[#8c978f] line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-5xl font-extrabold text-[#102116]">
              ${product.price}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => addToCart(product)}
              className="rounded-lg bg-[#102116] px-8 py-4 font-bold text-white transition hover:bg-[#1f7a3a]"
            >
              Agregar al carrito
            </button>
            <Link
              to={`/products?audience=${product.audience}&group=${product.group}&type=${product.type}`}
              className="rounded-lg border border-[#d7e3d2] px-8 py-4 font-bold text-[#102116] transition hover:border-[#1f7a3a]"
            >
              Ver similares
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetails;
