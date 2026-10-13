const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export function validateCheckoutField(name, value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    const messages = {
      name: "Ingresa tu nombre completo.",
      email: "Ingresa tu correo electronico.",
      address: "Ingresa tu direccion.",
    };
    return messages[name];
  }

  if (name === "email" && !emailPattern.test(trimmedValue)) {
    return "Ingresa un correo con formato valido, por ejemplo demo@example.com.";
  }

  return "";
}

export function validateCheckoutForm(formData) {
  const values = {};
  const errors = {};

  for (const name of ["name", "email", "address"]) {
    values[name] = formData[name].trim();
    const message = validateCheckoutField(name, values[name]);
    if (message) errors[name] = message;
  }

  return { values, errors };
}
