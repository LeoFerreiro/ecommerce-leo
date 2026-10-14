import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CheckoutConfirmation from "../components/checkout/CheckoutConfirmation";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";
import ShippingProgress from "../components/shipping/ShippingProgress";
import ShippingSelector from "../components/shipping/ShippingSelector";
import { getShippingCost, getShippingOption } from "../constants/shipping";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { formatPrice } from "../utils/currency";
import { validateCheckoutField, validateCheckoutForm } from "../utils/checkoutValidation";
import "../styles/checkout.css";

function Checkout({ checkoutForm }) {
  const { user } = useAuth();
  const { cartItems, clearCart, subtotal, getCartItemKey } = useCart();
  const [selectedShippingId, setSelectedShippingId] = useState("standard");
  const formRef = useRef(null);
  const pendingErrorFocusRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [simulation, setSimulation] = useState(null);
  const submittedRef = useRef(false);

  const { formData, setFormData, changeField, resetForm } = checkoutForm;

  const shippingCost = getShippingCost(subtotal, selectedShippingId);
  const total = subtotal + shippingCost;

  useEffect(() => {
    const fieldName = pendingErrorFocusRef.current;
    if (!fieldName) return;
    pendingErrorFocusRef.current = null;
    formRef.current?.elements.namedItem(fieldName)?.focus();
  }, [errors]);

  function handleChange(e) {
    const { name, value } = e.target;
    changeField(name, value);
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: validateCheckoutField(name, value) }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submittedRef.current || cartItems.length === 0) return;

    const validation = validateCheckoutForm(formData);
    setFormData(validation.values);
    setErrors(validation.errors);
    const firstInvalidField = Object.keys(validation.errors)[0];

    if (firstInvalidField) {
      pendingErrorFocusRef.current = firstInvalidField;
      return;
    }

    // Freeze only commercial data before clearCart updates the shared context.
    const snapshot = {
      items: cartItems.map((item) => ({
        lineId: getCartItemKey(item),
        title: item.title,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingTitle: getShippingOption(selectedShippingId).title,
      subtotal,
      shippingCost,
      total,
    };
    submittedRef.current = true;
    setSimulation(snapshot);
    resetForm();
    clearCart();
  }

  if (simulation) return <CheckoutConfirmation simulation={simulation} />;

  if (cartItems.length === 0) {
    return (
      <section className="section-shell checkout-page">
        <div className="checkout-empty">
          <h1>No hay productos para comprar</h1>
          <p>
            Agrega productos al carrito antes de avanzar al checkout.
          </p>
          <Link
            to="/products"
            className="checkout-empty-link"
          >
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell checkout-page">
      <p className="checkout-eyebrow">Checkout</p>
      <h1 className="checkout-title">
        Finalizar compra
      </h1>

      {!user && (
        <div className="checkout-account-notice">
          <span>Tambien podes </span>
          <Link to="/registro" className="font-bold underline">
            crear una cuenta demo
          </Link>
          <span> para completar tus datos mas rapido.</span>
        </div>
      )}

      <div className="checkout-layout">
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="checkout-form"
        >
          <h2>Datos de envio</h2>
          <p className="checkout-demo-notice">
            Esta pantalla simula el checkout. No ingreses datos reales de pago:
            no se procesan compras ni se envian pedidos.
          </p>

          <div className="checkout-fields">
            <div className="checkout-field">
              <label htmlFor="checkout-name">Nombre completo <span className="checkout-required">Obligatorio</span></label>
              <input
                id="checkout-name"
                type="text"
                name="name"
                required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "checkout-name-error" : undefined}
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p id="checkout-name-error" className="checkout-field-error">{errors.name}</p>}
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-email">Correo electronico <span className="checkout-required">Obligatorio</span></label>
              <input
                id="checkout-email"
                type="email"
                name="email"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "checkout-email-error" : undefined}
                placeholder="Correo electronico"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p id="checkout-email-error" className="checkout-field-error">{errors.email}</p>}
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-address">Direccion <span className="checkout-required">Obligatorio</span></label>
              <textarea
                id="checkout-address"
                name="address"
                required
                aria-invalid={errors.address ? true : undefined}
                aria-describedby={errors.address ? "checkout-address-error" : undefined}
                placeholder="Direccion"
                value={formData.address}
                onChange={handleChange}
                rows="4"
              />
              {errors.address && <p id="checkout-address-error" className="checkout-field-error">{errors.address}</p>}
            </div>
          </div>

          <div className="checkout-shipping">
            <fieldset className="checkout-shipping-group">
              <legend>Metodo de envio</legend>
              <div className="checkout-shipping-progress">
                <ShippingProgress subtotal={subtotal} />
              </div>
              <div className="checkout-shipping-options">
                <ShippingSelector
                  selectedShippingId={selectedShippingId}
                  subtotal={subtotal}
                  onChange={setSelectedShippingId}
                />
              </div>
            </fieldset>
          </div>

          <div className="checkout-actions">
            <div className="checkout-mobile-total">
              <span>Total estimado</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button
              type="submit"
              className="checkout-submit"
            >
              Simular compra
            </button>
          </div>
        </form>

        <CheckoutOrderSummary
          items={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
        />
      </div>
    </section>
  );
}

export default Checkout;
