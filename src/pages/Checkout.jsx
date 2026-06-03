import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Checkout() {
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

  if (cartItems.length === 0) {
    return (
      <section className="section-shell py-20">
        <div className="mx-auto max-w-3xl rounded-lg border border-[#d7e3d2] bg-white p-12 text-center">
          <h1 className="text-3xl font-extrabold">No hay productos para comprar</h1>
          <p className="mt-4 text-[#667369]">
            Agrega productos al carrito antes de avanzar al checkout.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-[#102116] px-6 py-3 font-bold text-white transition hover:bg-[#1f7a3a]"
          >
            Ver productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell min-h-screen py-20">
      <p className="font-semibold text-[#1f7a3a]">Checkout</p>
      <h1 className="mb-10 mt-3 text-4xl font-extrabold md:text-5xl">
        Finalizar compra
      </h1>

      {!user && (
        <div className="mb-8 rounded-lg border border-[#b9d9b7] bg-[#e8f3e5] p-4 text-[#102116]">
          <span>Tambien podes </span>
          <Link to="/registro" className="font-bold underline">
            crear una cuenta demo
          </Link>
          <span> para completar tus datos mas rapido.</span>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-[#d7e3d2] bg-white p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold">Datos de envio</h2>

          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#d7e3d2] p-4 outline-none transition focus:border-[#1f7a3a]"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electronico"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#d7e3d2] p-4 outline-none transition focus:border-[#1f7a3a]"
          />

          <textarea
            name="address"
            placeholder="Direccion"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border border-[#d7e3d2] p-4 outline-none transition focus:border-[#1f7a3a]"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-[#102116] py-4 font-bold text-white transition hover:bg-[#1f7a3a]"
          >
            Confirmar compra
          </button>
        </form>

        <div className="rounded-lg border border-[#d7e3d2] bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Resumen del pedido</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 border-b border-[#d7e3d2] pb-3"
              >
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-[#667369]">Cantidad: {item.quantity}</p>
                </div>

                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-[#d7e3d2] pt-6">
            <span className="text-xl">Total</span>
            <span className="text-3xl font-extrabold text-[#1f7a3a]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
