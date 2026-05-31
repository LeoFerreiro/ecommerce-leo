import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import useCart from "../hooks/useCart";
import useTheme from "../hooks/useTheme";

function Checkout() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.address
    ) {
      toast.error("Completá todos los campos");
      return;
    }

    toast.success("Compra realizada con éxito 🎉");

    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <section
      className={`
        min-h-screen
        px-6
        py-20
        transition-colors
        duration-300

        ${
          theme === "dark"
            ? "bg-slate-950 text-white"
            : "bg-[#F8FAFC] text-slate-900"
        }
      `}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className={`
              rounded-3xl
              shadow-lg
              p-8
              space-y-6

              ${
                theme === "dark"
                  ? "bg-slate-900 border border-white/10"
                  : "bg-white border border-black/5"
              }
            `}
          >
            <h2 className="text-2xl font-semibold">
              Datos de envío
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className={`
                w-full
                p-4
                rounded-xl
                border
                outline-none
                focus:border-violet-600

                ${
                  theme === "dark"
                    ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                    : "bg-white border-black/10 text-slate-900"
                }
              `}
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className={`
                w-full
                p-4
                rounded-xl
                border
                outline-none
                focus:border-violet-600

                ${
                  theme === "dark"
                    ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                    : "bg-white border-black/10 text-slate-900"
                }
              `}
            />

            <textarea
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className={`
                w-full
                p-4
                rounded-xl
                border
                outline-none
                focus:border-violet-600

                ${
                  theme === "dark"
                    ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                    : "bg-white border-black/10 text-slate-900"
                }
              `}
            />

            <button
              type="submit"
              className="
                w-full
                bg-violet-600
                hover:bg-violet-700
                text-white
                py-4
                rounded-2xl
                transition
                font-semibold
              "
            >
              Confirmar compra
            </button>
          </form>

          {/* Resumen */}
          <div
            className={`
              rounded-3xl
              shadow-lg
              p-8

              ${
                theme === "dark"
                  ? "bg-slate-900 border border-white/10"
                  : "bg-white border border-black/5"
              }
            `}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Resumen del pedido
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`
                    flex
                    justify-between
                    border-b
                    pb-3

                    ${
                      theme === "dark"
                        ? "border-white/10"
                        : "border-gray-200"
                    }
                  `}
                >
                  <div>
                    <p className="font-medium">
                      {item.title}
                    </p>

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
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={`
                mt-8
                pt-6
                border-t
                flex
                justify-between
                items-center

                ${
                  theme === "dark"
                    ? "border-white/10"
                    : "border-gray-200"
                }
              `}
            >
              <span className="text-xl">
                Total
              </span>

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