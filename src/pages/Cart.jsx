import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="section-shell py-20">
      <div className="mb-12">
        <p className="font-semibold text-[#1f7a3a]">Carrito</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
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
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-6 overflow-hidden rounded-lg border border-[#d7e3d2] bg-white p-6 md:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-[#e8f3e5] md:w-32">
                  <img
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

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[#667369]">Cantidad</p>
                      <span className="font-bold">{item.quantity}</span>
                    </div>

                    <p className="text-2xl font-extrabold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="shrink-0 text-red-500 transition hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-lg border border-[#d7e3d2] bg-white p-8">
            <h2 className="text-3xl font-extrabold">Resumen</h2>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-[#667369]">Subtotal</span>
              <span className="text-2xl font-extrabold">
                ${totalPrice.toFixed(2)}
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
