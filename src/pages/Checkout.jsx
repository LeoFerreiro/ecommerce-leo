import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

function Checkout() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      toast.error("Completa todos los campos");
      return;
    }

    toast.success("Compra realizada con exito");
    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 1600);
  }

  const surfaceClass =
    theme === "dark"
      ? "bg-slate-900 border-white/10 text-white"
      : "bg-white border-black/5 text-slate-900";

  const fieldClass =
    theme === "dark"
      ? "bg-slate-950 border-white/10 text-white placeholder:text-gray-500"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-gray-400";

  if (cartItems.length === 0) {
    return (
      <section className="px-6 py-20">
        <div className={`mx-auto max-w-3xl rounded-lg border p-12 text-center ${surfaceClass}`}>
          <h1 className="text-3xl font-bold">No hay productos para comprar</h1>
          <p
            className={`mt-4 ${
              theme === "dark" ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Agrega productos al carrito antes de avanzar al checkout.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <p className="font-semibold text-violet-600">Checkout</p>
        <h1 className="mt-3 mb-10 text-4xl font-bold md:text-5xl">
          Finalizar compra
        </h1>

        {!user && (
          <div
            className={`mb-8 rounded-lg border p-4 ${
              theme === "dark"
                ? "border-violet-500/30 bg-violet-500/10 text-violet-100"
                : "border-violet-200 bg-violet-50 text-violet-900"
            }`}
          >
            <span>Tambien podes </span>
            <Link to="/registro" className="font-semibold underline">
              crear una cuenta demo
            </Link>
            <span> para completar tus datos mas rapido.</span>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 rounded-lg border p-8 shadow-lg ${surfaceClass}`}
          >
            <h2 className="text-2xl font-semibold">Datos de envio</h2>

            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border p-4 outline-none transition focus:border-violet-600 ${fieldClass}`}
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electronico"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border p-4 outline-none transition focus:border-violet-600 ${fieldClass}`}
            />

            <textarea
              name="address"
              placeholder="Direccion"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className={`w-full rounded-lg border p-4 outline-none transition focus:border-violet-600 ${fieldClass}`}
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
            >
              Confirmar compra
            </button>
          </form>

          <div className={`rounded-lg border p-8 shadow-lg ${surfaceClass}`}>
            <h2 className="mb-6 text-2xl font-semibold">Resumen del pedido</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between gap-4 border-b pb-3 ${
                    theme === "dark" ? "border-white/10" : "border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-medium">{item.title}</p>

                    <p
                      className={
                        theme === "dark"
                          ? "text-sm text-gray-300"
                          : "text-sm text-gray-500"
                      }
                    >
                      Cantidad: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={`mt-8 flex items-center justify-between border-t pt-6 ${
                theme === "dark" ? "border-white/10" : "border-gray-200"
              }`}
            >
              <span className="text-xl">Total</span>

              <span className="text-3xl font-bold text-violet-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
