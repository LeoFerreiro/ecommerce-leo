import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";
import { validateRegistrationForm } from "../utils/validation";
import "../styles/account.css";

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
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const attemptedRef = useRef(false);
  const pendingErrorFocusRef = useRef(null);

  useEffect(() => {
    const fieldName = pendingErrorFocusRef.current;
    if (!fieldName) return;
    pendingErrorFocusRef.current = null;
    formRef.current?.elements.namedItem(fieldName)?.focus();
  }, [errors]);

  function handleChange(e) {
    const nextValues = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(nextValues);
    // Revalidate confirmation too when its matching password changes.
    if (attemptedRef.current) setErrors(validateRegistrationForm(nextValues).errors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    attemptedRef.current = true;
    const validation = validateRegistrationForm(formData);
    setFormData(validation.values);
    setErrors(validation.errors);
    const firstInvalidField = Object.keys(validation.errors)[0];
    if (firstInvalidField) {
      pendingErrorFocusRef.current = firstInvalidField;
      return;
    }

    registerUser(validation.values);
    toast.success("Registro demo creado");
    navigate("/products");
  }

  if (user) {
    return (
      <section className="section-shell account-page account-profile">
        <header className="account-heading">
          <p className="account-eyebrow">Cuenta demo activa</p>
          <h1 className="account-title">
            Hola, {user.name}. Tu sesion esta lista para probar la tienda.
          </h1>
          <p className="account-description">
            Esta cuenta vive solamente en memoria. Si cerras o recargas la
            pagina, los datos de registro desaparecen.
          </p>
        </header>
        <div className="account-details">
          <p className="account-eyebrow">Usuario</p>
          <h2 className="account-user-name">{user.name}</h2>
          <p className="account-user-email">{user.email}</p>
        </div>
        <div className="account-actions">
          <Link
            to="/products"
            className="account-button account-button-primary"
          >
            Ver productos
          </Link>
          <button
            onClick={logoutUser}
            className="account-button account-button-secondary"
          >
            Cerrar sesion demo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell account-page">
      <div className="account-register-layout">
        <header className="account-heading">
          <p className="account-eyebrow">Registro demo</p>
          <h1 className="account-title">
            Crea una cuenta para guardar tu experiencia durante la demo.
          </h1>
          <p className="account-description">
            Los datos no se guardan en localStorage ni en una base de datos.
            Solo quedan activos mientras la pagina permanece abierta.
          </p>
        </header>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="account-form"
        >
          <div className="account-fields">
            <FormField name="name" error={errors.name} icon={<FaUser />} label="Nombre">
              <input
                id="register-name"
                required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "register-name-error" : undefined}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Leo Martinez"
                className="account-input"
              />
            </FormField>

            <FormField name="email" error={errors.email} icon={<FaEnvelope />} label="Email">
              <input
                id="register-email"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "register-email-help register-email-error" : "register-email-help"}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="leo@email.com"
                className="account-input"
              />
            </FormField>

            <div className="account-password-fields">
              <FormField name="password" error={errors.password} icon={<FaLock />} label="Contrasena">
                <input
                  id="register-password"
                  required
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? "register-password-help register-password-error" : "register-password-help"}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="8 a 15 caracteres"
                  className="account-input"
                />
              </FormField>

              <FormField name="confirmPassword" error={errors.confirmPassword} icon={<FaLock />} label="Confirmar">
                <input
                  id="register-confirmPassword"
                  required
                  aria-invalid={errors.confirmPassword ? true : undefined}
                  aria-describedby={errors.confirmPassword ? "register-confirmPassword-error" : undefined}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeti la clave"
                  className="account-input"
                />
              </FormField>
            </div>
          </div>

          <p id="register-password-help" className="account-help">
            Usa de 8 a 15 caracteres y combina al menos tres tipos: minusculas,
            mayusculas, numeros o simbolos. Los espacios no cuentan como simbolos.
          </p>

          <button
            type="submit"
            className="account-button account-button-primary account-submit"
          >
            Crear cuenta demo
          </button>
          <p id="register-email-help" className="account-help account-email-help">
            Usa un correo ficticio con formato valido, por ejemplo demo@example.com.
            No comprobamos si esa direccion existe.
          </p>
        </form>
      </div>
    </section>
  );
}

function FormField({ name, error, icon, label, children }) {
  return (
    <div className="account-field">
      <label htmlFor={`register-${name}`} className="account-field-label">
        {label} <span className="account-required">Obligatorio</span>
      </label>
      <div className={`account-input-wrap${error ? " account-input-error" : ""}`}>
        <span className="account-field-icon" aria-hidden="true">{icon}</span>
        {children}
      </div>
      {error && <p id={`register-${name}-error`} className="account-field-error">{error}</p>}
    </div>
  );
}

export default Register;
