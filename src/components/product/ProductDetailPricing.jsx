import { formatPrice } from "../../utils/currency";

function ProductDetailPricing({ price, originalPrice }) {
  return (
    <div className="product-detail-prices">
      {originalPrice && (
        <p className="product-detail-original-price">
          <span className="sr-only">Precio original: </span>
          <del>{formatPrice(originalPrice)}</del>
        </p>
      )}
      <p className="product-detail-price">
        <span className="sr-only">Precio actual: </span>
        {formatPrice(price)}
      </p>
    </div>
  );
}

export default ProductDetailPricing;
