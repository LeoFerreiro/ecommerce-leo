import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

function Cart() {
  const { theme } = useTheme();
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const surfaceClass =
    theme === "dark"
      ? "bg-slate-900 border-white/10 text-white"
      : "bg-white border-black/5 text-slate-900";

  return (
    <section className="w-full overflow-x-hidden px-6 py-20 md:px-10 xl:px-16">
      <div className="mb-12">
        <p className="font-semibold text-violet-600">Carrito</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Tus productos
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className={`rounded-lg border p-12 text-center ${surfaceClass}`}>
          <h2 className="text-3xl font-bold">Tu carrito esta vacio</h2>

          <p
            className={`mt-4 ${
              theme === "dark" ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Agrega productos para continuar.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
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
                className={`flex flex-col gap-6 overflow-hidden rounded-lg border p-6 md:flex-row ${surfaceClass}`}
              >
                <div
                  className={`flex h-32 w-full shrink-0 items-center justify-center rounded-lg p-4 md:w-32 ${
                    theme === "dark" ? "bg-slate-800" : "bg-gray-100"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-violet-600">{item.category}</p>

                  <h2 className="mt-2 break-words text-xl font-semibold">
                    {item.title}
                  </h2>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p
                        className={
                          theme === "dark" ? "text-slate-300" : "text-gray-500"
                        }
                      >
                        Cantidad
                      </p>
                      <span className="font-semibold">{item.quantity}</span>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
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

          <div className={`h-fit rounded-lg border p-8 ${surfaceClass}`}>
            <h2 className="text-3xl font-bold">Resumen</h2>

            <div className="mt-8 flex items-center justify-between">
              <span
                className={theme === "dark" ? "text-slate-300" : "text-gray-500"}
              >
                Subtotal
              </span>

              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-10 block w-full rounded-lg bg-violet-600 py-4 text-center font-semibold text-white transition hover:bg-violet-700"
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
