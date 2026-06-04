import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
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
      toast.error("La contrasena debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contrasenas no coinciden");
      return;
    }

    registerUser(formData);
    toast.success("Registro demo creado");
    navigate("/products");
  }

  if (user) {
    return (
      <section className="section-shell py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="font-semibold text-[#1f7a3a]">Cuenta demo activa</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Hola, {user.name}. Tu sesion esta lista para probar la tienda.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667369]">
              Esta cuenta vive solamente en memoria. Si cerras o recargas la
              pagina, los datos de registro desaparecen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-[#102116] px-6 py-3 font-bold text-white transition hover:bg-[#1f7a3a]"
              >
                Ver productos
              </Link>
              <button
                onClick={logoutUser}
                className="rounded-lg border border-[#d7e3d2] px-6 py-3 font-bold transition hover:border-[#1f7a3a]"
              >
                Cerrar sesion demo
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#d7e3d2] bg-white p-6 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f7a3a]">
              Usuario
            </p>
            <h2 className="mt-3 text-2xl font-extrabold">{user.name}</h2>
            <p className="mt-2 text-[#667369]">{user.email}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-24">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <p className="font-semibold text-[#1f7a3a]">Registro demo</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Crea una cuenta para guardar tu experiencia durante la demo.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#667369]">
            Los datos no se guardan en localStorage ni en una base de datos.
            Solo quedan activos mientras la pagina permanece abierta.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#d7e3d2] bg-white p-6 shadow-xl md:p-8"
        >
          <div className="grid gap-5">
            <FormField icon={<FaUser />} label="Nombre">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Leo Martinez"
                className="w-full bg-transparent py-4 outline-none"
              />
            </FormField>

            <FormField icon={<FaEnvelope />} label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="leo@email.com"
                className="w-full bg-transparent py-4 outline-none"
              />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField icon={<FaLock />} label="Contrasena">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimo 6 caracteres"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </FormField>

              <FormField icon={<FaLock />} label="Confirmar">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeti la clave"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </FormField>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-[#102116] py-4 font-bold text-white transition hover:bg-[#1f7a3a]"
          >
            Crear cuenta demo
          </button>
        </form>
      </div>
    </section>
  );
}

function FormField({ icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <div className="flex items-center gap-3 rounded-lg border border-[#d7e3d2] bg-[#f8faf6] px-4 text-[#111813]">
        <span className="text-[#1f7a3a]">{icon}</span>
        {children}
      </div>
    </label>
  );
}

export default Register;
