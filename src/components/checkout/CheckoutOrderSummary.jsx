import { getCartItemKey } from "../../utils/cartStorage";
import { formatPrice } from "../../utils/currency";

function CheckoutOrderSummary({ items, subtotal, shippingCost, total, shippingTitle, title = "Resumen del pedido", totalLabel = "Total" }) {
  return (
    <div className="checkout-summary">
      <h2>{title}</h2>
      {shippingTitle && (
        <p className="checkout-confirmation-shipping">
          <span>Metodo de envio</span>
          <strong>{shippingTitle}</strong>
        </p>
      )}
      <div className="checkout-order-lines">
        {items.map((item) => (
          <div key={getCartItemKey(item)} className="checkout-order-line">
            <div className="checkout-order-information">
              <p className="checkout-order-name">{item.title}</p>
              {item.selectedSize && <p className="checkout-order-size">Talle: {item.selectedSize}</p>}
              <p className="checkout-order-quantity">Cantidad: {item.quantity}</p>
            </div>
            <span className="checkout-order-price">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="checkout-totals">
        <div className="checkout-total-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="checkout-total-row">
          <span>Envio</span>
          <span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
        </div>
      </div>
      <div className="checkout-final-total">
        <span>{totalLabel}</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
