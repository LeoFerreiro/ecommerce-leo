import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const { theme } = useTheme();
  const { user, registerUser, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Completa todos los campos");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    registerUser(formData);
    toast.success("Registro demo creado");
    navigate("/products");
  }

  const panelClass =
    theme === "dark"
      ? "bg-slate-900 border-white/10 text-white"
      : "bg-white border-black/5 text-slate-900";

  const inputClass =
    theme === "dark"
      ? "bg-slate-950 border-white/10 text-white placeholder:text-slate-500"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400";

  if (user) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="font-semibold text-violet-600">Cuenta demo activa</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Hola, {user.name}. Tu sesion esta lista para probar la tienda.
            </h1>
            <p
              className={`mt-5 max-w-2xl text-lg leading-8 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Esta cuenta vive solamente en memoria. Si cerras o recargas la
              pagina, los datos de registro desaparecen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                Ver productos
              </Link>
              <button
                onClick={logoutUser}
                className={`rounded-lg border px-6 py-3 font-semibold transition ${
                  theme === "dark"
                    ? "border-white/10 hover:border-violet-500"
                    : "border-slate-200 hover:border-violet-500"
                }`}
              >
                Cerrar sesion demo
              </button>
            </div>
          </div>

          <div className={`rounded-lg border p-6 shadow-xl ${panelClass}`}>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-500">
              Usuario
            </p>
            <h2 className="mt-3 text-2xl font-bold">{user.name}</h2>
            <p
              className={`mt-2 ${theme === "dark" ? "text-slate-300" : "text-slate-500"}`}
            >
              {user.email}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <p className="font-semibold text-violet-600">Registro demo</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Crea una cuenta para probar una experiencia de compra mas completa.
          </h1>
          <p
            className={`mt-5 text-lg leading-8 ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Los datos no se guardan en localStorage ni en una base de datos.
            Solo quedan activos mientras la pagina permanece abierta.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-lg border p-6 shadow-xl md:p-8 ${panelClass}`}
        >
          <div className="grid gap-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Nombre</span>
              <div className={`flex items-center gap-3 rounded-lg border px-4 ${inputClass}`}>
                <FaUser className="text-violet-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Leo Martinez"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Email</span>
              <div className={`flex items-center gap-3 rounded-lg border px-4 ${inputClass}`}>
                <FaEnvelope className="text-violet-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="leo@email.com"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Contraseña
                </span>
                <div className={`flex items-center gap-3 rounded-lg border px-4 ${inputClass}`}>
                  <FaLock className="text-violet-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimo 6 caracteres"
                    className="w-full bg-transparent py-4 outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Confirmar
                </span>
                <div className={`flex items-center gap-3 rounded-lg border px-4 ${inputClass}`}>
                  <FaLock className="text-violet-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeti la clave"
                    className="w-full bg-transparent py-4 outline-none"
                  />
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
          >
            Crear cuenta demo
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
