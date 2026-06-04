import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SafeImage from "../components/common/SafeImage";
import {
  getAvailableSizes,
  getSizeStock,
  getTotalStock,
} from "../constants/productSizes";
import useCart from "../hooks/useCart";
import { getProduct } from "../services/api";
import { formatPrice } from "../utils/currency";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id);
      setProduct(data);
      setSelectedSize("");
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

  const totalStock = getTotalStock(product);
  const hasStock = totalStock > 0;
  const availableSizes = getAvailableSizes(product);
  const requiresSize = availableSizes.length > 0;
  const selectedSizeStock = requiresSize
    ? getSizeStock(product, selectedSize)
    : totalStock;

  return (
    <section className="section-shell section-stack">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg border border-[#d7e3d2] bg-white"
        >
          <SafeImage
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

          <div
            className={`mt-8 inline-flex rounded-full px-4 py-2 text-sm font-bold ${
              hasStock
                ? "bg-[#e8f3e5] text-[#1f7a3a]"
                : "bg-red-50 text-red-600"
            }`}
          >
            {hasStock ? `${totalStock} unidades disponibles` : "Sin stock"}
          </div>

          {requiresSize && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-extrabold text-[#102116]">
                  Selecciona tu talle
                </h2>
                <span className="text-sm font-semibold text-[#667369]">
                  {product.group === "calzado" ? "Numeracion AR" : "Indumentaria"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {availableSizes.map((size) => (
                  <SizeButton
                    key={size}
                    size={size}
                    stock={getSizeStock(product, size)}
                    isSelected={selectedSize === size}
                    onSelect={() => setSelectedSize(size)}
                  />
                ))}
              </div>

              {selectedSize && (
                <p className="mt-3 text-sm font-semibold text-[#667369]">
                  Stock en talle {selectedSize}: {selectedSizeStock} unidades
                </p>
              )}
            </div>
          )}

          <div className="mt-10 flex items-end gap-4">
            {product.originalPrice && (
              <span className="text-2xl font-bold text-[#8c978f] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-5xl font-extrabold text-[#102116]">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              disabled={!hasStock}
              onClick={() => addToCart(product, selectedSize)}
              className="rounded-lg bg-[#102116] px-8 py-4 font-bold text-white transition hover:bg-[#1f7a3a] disabled:cursor-not-allowed disabled:bg-[#8c978f]"
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

function SizeButton({ size, stock, isSelected, onSelect }) {
  const hasStock = stock > 0;

  return (
    <button
      type="button"
      disabled={!hasStock}
      onClick={onSelect}
      className={`rounded-lg border px-3 py-3 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:border-[#d7e3d2] disabled:bg-[#f2f5f1] disabled:text-[#9aa49d] ${
        isSelected
          ? "border-[#102116] bg-[#102116] text-white"
          : "border-[#d7e3d2] bg-white text-[#102116] hover:border-[#1f7a3a]"
      }`}
    >
      <span className="block">{size}</span>
      <span className="mt-1 block text-[11px] font-bold">
        {hasStock ? `${stock} disp.` : "Agotado"}
      </span>
    </button>
  );
}

export default ProductDetails;
