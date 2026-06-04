import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import SafeImage from "../components/common/SafeImage";
import ShippingProgress from "../components/shipping/ShippingProgress";
import { getShippingCost } from "../constants/shipping";
import useCart from "../hooks/useCart";
import { formatPrice } from "../utils/currency";

function Cart() {
  const { cartItems, removeFromCart, subtotal, getCartItemKey } = useCart();
  const shippingCost = getShippingCost(subtotal);
  const total = subtotal + shippingCost;

  return (
    <section className="section-shell section-stack">
      <div className="mb-16">
        <p className="mb-5 font-semibold text-[#1f7a3a]">Carrito</p>
        <h1 className="text-4xl font-extrabold leading-[1.15] md:text-5xl">
          Tus productos
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-lg border border-[#d7e3d2] bg-white p-12 text-center">
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
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            {cartItems.map((item) => (
              <div
                key={getCartItemKey(item)}
                className="flex flex-col gap-6 overflow-hidden rounded-lg border border-[#d7e3d2] bg-white p-6 md:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-[#e8f3e5] md:w-32">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold capitalize text-[#1f7a3a]">
                    {item.brand} / {item.group} / {item.type}
                  </p>

                  <h2 className="mt-2 break-words text-xl font-bold">
                    {item.title}
                  </h2>

                  {item.selectedSize && (
                    <p className="mt-2 text-sm font-bold text-[#102116]">
                      Talle: {item.selectedSize}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[#667369]">Cantidad</p>
                      <span className="font-bold">{item.quantity}</span>
                      <p className="mt-1 text-sm text-[#667369]">
                        {item.selectedSize
                          ? `Stock en talle: ${item.stock}`
                          : `Stock disponible: ${item.stock}`}
                      </p>
                    </div>

                    <p className="text-2xl font-extrabold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(getCartItemKey(item))}
                  className="shrink-0 text-red-500 transition hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-lg border border-[#d7e3d2] bg-white p-8">
            <h2 className="text-3xl font-extrabold">Resumen</h2>

            <div className="mt-8">
              <ShippingProgress subtotal={subtotal} />
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-[#667369]">Subtotal</span>
              <span className="text-2xl font-extrabold">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[#667369]">Envio estandar</span>
              <span className="text-xl font-extrabold">
                {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#d7e3d2] pt-6">
              <span className="text-xl font-bold">Total estimado</span>
              <span className="text-3xl font-extrabold text-[#1f7a3a]">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-10 block w-full rounded-lg bg-[#102116] py-4 text-center font-bold text-white transition hover:bg-[#1f7a3a]"
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
