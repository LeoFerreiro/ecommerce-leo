import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import SafeImage from "../components/common/SafeImage";
import ShippingProgress from "../components/shipping/ShippingProgress";
import { getShippingCost } from "../constants/shipping";
import useCart from "../hooks/useCart";
import { formatPrice } from "../utils/currency";
import "../styles/cart-dialog.css";

function Cart() {
  const { cartItems, removeFromCart, subtotal, getCartItemKey } = useCart();
  const shippingCost = getShippingCost(subtotal);
  const total = subtotal + shippingCost;

  return (
    <section className="section-shell cart-page">
      <div className="cart-page-heading">
        <p>Carrito</p>
        <h1>
          Tus productos
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-page-empty">
          <h2 className="text-3xl font-extrabold">Tu carrito esta vacio</h2>
          <p className="mt-4 text-[#667369]">Agrega productos para continuar.</p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-[#102116] px-6 py-3 font-bold text-white transition hover:bg-[#1f7a3a]"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <div className="cart-page-list">
            {cartItems.map((item) => (
              <div
                key={getCartItemKey(item)}
                className="cart-line cart-page-line"
              >
                <div className="cart-line-image">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="cart-line-information">
                  <p className="cart-line-category">
                    {item.brand} / {item.group} / {item.type}
                  </p>

                  <h2 className="cart-line-name">
                    {item.title}
                  </h2>

                  {item.selectedSize && (
                    <p className="cart-line-size">
                      Talle: {item.selectedSize}
                    </p>
                  )}

                  <div className="cart-page-line-purchase">
                    <div className="cart-page-line-quantity">
                      <p>Cantidad <strong>{item.quantity}</strong></p>
                      <p className="cart-line-stock">
                        {item.selectedSize
                          ? `Stock en talle: ${item.stock}`
                          : `Stock disponible: ${item.stock}`}
                      </p>
                    </div>

                    <p className="cart-line-price">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Eliminar ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""} del carrito`}
                  title={`Eliminar ${item.title}${item.selectedSize ? `, talle ${item.selectedSize}` : ""}`}
                  onClick={() => removeFromCart(getCartItemKey(item))}
                  className="cart-icon-button cart-remove-button"
                >
                  <FaTrash aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary cart-page-summary">
            <h2>Resumen</h2>

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
              <span>Envio estandar</span>
              <span>
                {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="cart-summary-total">
              <span>Total estimado</span>
              <span>
                {formatPrice(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="cart-checkout-button"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
