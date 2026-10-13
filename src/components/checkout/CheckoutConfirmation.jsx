import { useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import CheckoutOrderSummary from "./CheckoutOrderSummary";

function CheckoutConfirmation({ simulation }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="section-shell checkout-page checkout-confirmation">
      <header className="checkout-confirmation-heading">
        <FaCheckCircle className="checkout-success-icon" aria-hidden="true" />
        <h1 ref={headingRef} tabIndex={-1} aria-describedby="checkout-confirmation-notice" className="checkout-confirmation-title">
          ¡Simulación completada!
        </h1>
        <p id="checkout-confirmation-notice" className="checkout-confirmation-notice">
          Esta fue una simulacion. No se realizo ninguna compra real ni se proceso ningun pago.
        </p>
      </header>
      <CheckoutOrderSummary
        items={simulation.items}
        subtotal={simulation.subtotal}
        shippingCost={simulation.shippingCost}
        total={simulation.total}
        shippingTitle={simulation.shippingTitle}
        title="Resumen de la simulacion"
        totalLabel="Total simulado"
      />
      <Link
        to="/products"
        className="checkout-continue-button"
        onClick={(event) => {
          // Ignore a second click carried over from submitting the form.
          if (event.detail > 1) event.preventDefault();
        }}
      >
        Seguir comprando
      </Link>
    </section>
  );
}

export default CheckoutConfirmation;
