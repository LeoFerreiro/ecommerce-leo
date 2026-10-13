import { useId } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import SafeImage from "./common/SafeImage";
import {
  formatAvailableSizes,
  getAvailableSizes,
  getTotalStock,
} from "../constants/productSizes";
import useCart from "../hooks/useCart";
import { formatPrice } from "../utils/currency";

function ProductCard({ product }) {
  const titleId = useId();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const totalStock = getTotalStock(product);
  const hasStock = totalStock > 0;
  const availableSizes = getAvailableSizes(product);
  const requiresSize = availableSizes.length > 0;
  const purchaseLabel = !hasStock
    ? `Sin stock: ${product.title}`
    : requiresSize
      ? `Seleccionar talle de ${product.title}`
      : `Agregar ${product.title} al carrito`;

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
        aria-labelledby={titleId}
      >
        <div className="product-card-media">
          <SafeImage src={product.image} alt={product.title} className="product-card-image" />
          <div className="product-card-badges">
            {product.isLaunch && <span className="product-badge-new">Nuevo</span>}
            {product.isSale && <span className="product-badge-sale">Sale</span>}
          </div>
        </div>
        <div className="product-card-body">
          <div className="product-card-brand">
            <span>{product.brand}</span>
            <span>{product.sport}</span>
          </div>
          <h2 id={titleId} className="product-card-title">{product.title}</h2>
          <p className={`product-card-stock${hasStock ? "" : " product-card-stock-empty"}`}>
            {hasStock ? `Stock total: ${totalStock}` : "Sin stock"}
          </p>
          <p className="product-card-category">
            {product.audience} / {product.group} / {product.type}
          </p>
          <p className="product-card-sizes">
            Talles: {formatAvailableSizes(availableSizes)}
          </p>
        </div>
      </Link>
      <div className="product-card-footer">
        <div className="product-card-prices">
          {product.originalPrice && (
            <p className="product-card-original-price">{formatPrice(product.originalPrice)}</p>
          )}
          <p className="product-card-price">{formatPrice(product.price)}</p>
        </div>
        <button
          type="button"
          className="product-card-buy"
          disabled={!hasStock}
          aria-label={purchaseLabel}
          title={purchaseLabel}
          onClick={() => {
            if (requiresSize) {
              navigate(`/product/${product.id}`);
              return;
            }
            addToCart(product);
          }}
        >
          <FaShoppingBag aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

export default ProductCard;
