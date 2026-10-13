import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import SafeImage from "./common/SafeImage";
import ShippingProgress from "./shipping/ShippingProgress";
import { getShippingCost } from "../constants/shipping";
import useCart from "../hooks/useCart";
import useModalDialog from "../hooks/useModalDialog";
import { formatPrice } from "../utils/currency";
import "../styles/cart-dialog.css";

function CartDrawer() {
  const cart = useCart();

  return (
    <AnimatePresence>
      {cart.isCartOpen && <CartDialog key="cart-dialog" cart={cart} />}
    </AnimatePresence>
  );
}

function CartDialog({ cart }) {
  const dialogRef = useRef(null);
  const [stockMessage, setStockMessage] = useState("");
  const {
    closeCart,
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    getCartItemKey,
  } = cart;
  const shippingCost = getShippingCost(subtotal);
  const total = subtotal + shippingCost;
  const totalUnits = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Keep the native modal open through its existing exit animation.
  useModalDialog(dialogRef, true, closeCart, undefined, false);

  return (
    <motion.dialog
      ref={dialogRef}
      aria-labelledby="cart-dialog-title"
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault();
        closeCart();
      }}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.target === event.currentTarget && (
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom
        )) closeCart();
      }}
      initial={{ x: 420 }}
      animate={{ x: 0 }}
      exit={{ x: 420 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="cart-dialog"
    >
      <div className="cart-dialog-heading">
        <h2 id="cart-dialog-title">Tu carrito</h2>

        <button
          type="button"
          aria-label="Cerrar carrito"
          title="Cerrar carrito"
          onClick={closeCart}
          className="cart-icon-button"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {totalUnits === 0 ? "Carrito vacio. Subtotal: " : `${totalUnits} unidades en el carrito. Subtotal: `}
        {formatPrice(subtotal)}. Total: {formatPrice(totalUnits === 0 ? 0 : total)}.
      </p>
      <p role="alert" aria-atomic="true" className="cart-stock-message">
        {stockMessage}
      </p>

      {cartItems.length === 0 ? (
        <div className="cart-dialog-empty">
          Tu carrito esta vacio
        </div>
      ) : (
        <>
          <div className="cart-dialog-list">
            {cartItems.map((item) => (
              <div
                key={getCartItemKey(item)}
                className="cart-line cart-drawer-line"
              >
                <div className="cart-line-image">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="cart-line-information">
                  <h3 className="cart-line-name">{item.title}</h3>
                  <p className="cart-line-price">
                    {formatPrice(item.price)}
                  </p>
                  {item.selectedSize && (
                    <p className="cart-line-size">
                      Talle: {item.selectedSize}
                    </p>
                  )}
                  <p className="cart-line-stock">
                    {item.selectedSize
                      ? `Stock talle: ${item.stock}`
                      : `Stock: ${item.stock}`}
                  </p>

                  <div className="cart-line-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""}`}
                        onClick={() => {
                          setStockMessage("");
                          decreaseQuantity(getCartItemKey(item));
                        }}
                        className="cart-quantity-button"
                      >
                        -
                      </button>
                      <span className="cart-quantity-value">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""}`}
                        onClick={() => {
                          // The existing toast is outside the native modal's accessible tree.
                          setStockMessage(item.quantity >= item.stock
                            ? `Solo hay ${item.stock} unidades disponibles`
                            : "");
                          increaseQuantity(getCartItemKey(item));
                        }}
                        className="cart-quantity-button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Eliminar ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""} del carrito`}
                      title={`Eliminar ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""}`}
                      onClick={() => {
                        setStockMessage("");
                        removeFromCart(getCartItemKey(item));
                      }}
                      className="cart-icon-button cart-remove-button"
                    >
                      <FaTrash aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary cart-dialog-summary">
            <div className="cart-shipping-progress">
              <ShippingProgress subtotal={subtotal} />
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="cart-summary-row">
              <span>Envio</span>
              <span>
                {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>
                {formatPrice(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              onClick={closeCart}
              className="cart-checkout-button"
            >
              Finalizar compra
            </Link>
          </div>
        </>
      )}
    </motion.dialog>
  );
}

export default CartDrawer;
