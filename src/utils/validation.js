export function isValidEmail(email) {
  const normalizedEmail = email.trim();
  const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
  const localPart = normalizedEmail.split("@")[0];
  return emailPattern.test(normalizedEmail) && !localPart.startsWith(".") &&
    !localPart.endsWith(".") && !localPart.includes("..");
}

export function getPasswordCharacterTypeCount(password) {
  const checks = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9\s]/.test(password),
  ];

  return checks.filter(Boolean).length;
}

export function validateRegistrationForm(formData) {
  const values = { ...formData, name: formData.name.trim(), email: formData.email.trim() };
  const errors = {};

  if (!values.name) errors.name = "Ingresa tu nombre.";
  if (!values.email) errors.email = "Ingresa tu correo electronico.";
  else if (!isValidEmail(values.email)) errors.email = "Ingresa un correo con formato valido, por ejemplo demo@example.com.";

  if (!values.password) errors.password = "Ingresa una contrasena.";
  else if (values.password.length < 8 || values.password.length > 15) {
    errors.password = "La contrasena debe tener entre 8 y 15 caracteres.";
  } else if (!isValidPassword(values.password)) {
    errors.password = "Combina al menos tres tipos: minusculas, mayusculas, numeros o simbolos. Los espacios no cuentan como simbolos.";
  }

  if (!values.confirmPassword) errors.confirmPassword = "Confirma tu contrasena.";
  else if (values.confirmPassword !== values.password) errors.confirmPassword = "Las contrasenas no coinciden.";

  return { values, errors };
}

export function isValidPassword(password) {
  return (
    password.length >= 8 &&
    password.length <= 15 &&
    getPasswordCharacterTypeCount(password) >= 3
  );
}
