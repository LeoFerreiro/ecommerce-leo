import { useId } from "react";
import { getSizeStock } from "../../constants/productSizes";

function ProductSizeSelector({ product, availableSizes, selectedSize, selectedSizeStock, onSelect }) {
  const availabilityId = useId();

  return (
    <fieldset className="product-detail-sizes" aria-describedby={availabilityId}>
      <legend>Selecciona tu talle</legend>
      <p className="product-detail-size-system">
        {product.group === "calzado" ? "Numeracion AR" : "Indumentaria"}
      </p>
      <div className="product-detail-size-grid">
        {availableSizes.map((size) => {
          const stock = getSizeStock(product, size);
          const hasStock = stock > 0;
          return (
            <button
              key={size}
              type="button"
              disabled={!hasStock}
              aria-pressed={selectedSize === size}
              onClick={() => onSelect(size)}
            >
              <span>{size}</span>
              <span>{hasStock ? `${stock} disp.` : "Agotado"}</span>
            </button>
          );
        })}
      </div>
      <p id={availabilityId} className="product-detail-size-stock" role="status" aria-live="polite" aria-atomic="true">
        {selectedSize ? `Stock en talle ${selectedSize}: ${selectedSizeStock} unidades` : ""}
      </p>
    </fieldset>
  );
}

export default ProductSizeSelector;
