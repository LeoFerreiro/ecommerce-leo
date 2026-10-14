import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import SafeImage from "../components/common/SafeImage";
import PageEmptyState from "../components/common/PageEmptyState";
import ProductDetailPricing from "../components/product/ProductDetailPricing";
import ProductSizeSelector from "../components/product/ProductSizeSelector";
import { getAvailableSizes, getSizeStock, getTotalStock } from "../constants/productSizes";
import useCart from "../hooks/useCart";
import { getProduct } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [loaded, setLoaded] = useState({ id: null, status: "loading", product: null });
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      try {
        const data = await getProduct(id);
        if (active) {
          setLoaded({ id, status: data ? "found" : "missing", product: data });
          setSelectedSize("");
        }
      } catch {
        if (active) setLoaded({ id, status: "error", product: null });
      }
    }

    loadProduct();
    return () => { active = false; };
  }, [id]);

  const status = loaded.id === id ? loaded.status : "loading";
  if (status === "loading") {
    return (
      <div className="product-detail-loading" role="status">
        Cargando producto...
      </div>
    );
  }

  if (status !== "found") {
    return (
      <PageEmptyState
        title={status === "missing" ? "Producto no encontrado" : "No pudimos cargar el producto"}
        description={status === "missing"
          ? "El producto que buscas no esta disponible en este catalogo."
          : "Intenta nuevamente o explora los productos del catalogo."}
      />
    );
  }

  const product = loaded.product;

  const totalStock = getTotalStock(product);
  const hasStock = totalStock > 0;
  const availableSizes = getAvailableSizes(product);
  const requiresSize = availableSizes.length > 0;
  const selectedSizeStock = requiresSize
    ? getSizeStock(product, selectedSize)
    : totalStock;
  const categories = [product.audience, product.group, product.type, product.category]
    .filter((value, index, values) => (
      values.findIndex((item) => item.toLowerCase() === value.toLowerCase()) === index
    ));

  return (
    <section className="section-shell product-detail">
      <motion.header
        className="product-detail-heading"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="product-detail-brand">
          <span>{product.brand}</span>
          <span>{product.sport}</span>
        </div>
        <h1>{product.title}</h1>
        <p className="product-detail-categories">{categories.join(" / ")}</p>
        {(product.isLaunch || product.isSale) && (
          <div className="product-detail-badges">
            {product.isLaunch && <span className="product-badge-new">Nuevo</span>}
            {product.isSale && <span className="product-badge-sale">Sale</span>}
          </div>
        )}
      </motion.header>

      <motion.div
        className="product-detail-media"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SafeImage src={product.image} alt={product.title} className="product-detail-image" />
      </motion.div>

      <div className="product-detail-purchase">
        <ProductDetailPricing price={product.price} originalPrice={product.originalPrice} />
        <p className={`product-detail-stock${hasStock ? "" : " product-detail-stock-empty"}`}>
          {hasStock ? `${totalStock} unidades disponibles` : "Sin stock"}
        </p>

        {requiresSize ? (
          <ProductSizeSelector
            product={product}
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            selectedSizeStock={selectedSizeStock}
            onSelect={setSelectedSize}
          />
        ) : (
          <p className="product-detail-unique-size">Talle único</p>
        )}

        <div className="product-detail-actions">
          <button
            type="button"
            disabled={!hasStock}
            onClick={() => addToCart(product, selectedSize)}
          >
            <FaShoppingBag aria-hidden="true" />
            Agregar al carrito
          </button>
          <Link to={`/products?audience=${product.audience}&group=${product.group}&type=${product.type}`}>
            Ver similares
          </Link>
        </div>
      </div>

      <p className="product-detail-description">{product.description}</p>
    </section>
  );
}

export default ProductDetails;
