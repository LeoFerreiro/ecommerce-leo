const commonEmailDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
  "proton.me",
  "protonmail.com",
];

export function isValidEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(normalizedEmail)) {
    return false;
  }

  const domain = normalizedEmail.split("@")[1];
  return commonEmailDomains.includes(domain);
}

export function getPasswordCharacterTypeCount(password) {
  const checks = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return checks.filter(Boolean).length;
}

export function isValidPassword(password) {
  return (
    password.length >= 8 &&
    password.length <= 15 &&
    getPasswordCharacterTypeCount(password) >= 3
  );
}
