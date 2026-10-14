import { useState } from "react";

export function createCheckoutDraft(account) {
  return {
    account,
    values: { name: account?.name || "", email: account?.email || "", address: "" },
    sources: { name: account ? "account" : "empty", email: account ? "account" : "empty" },
  };
}

export function syncCheckoutAccount(draft, account) {
  const next = { ...draft, account, values: { ...draft.values }, sources: { ...draft.sources } };
  for (const field of ["name", "email"]) {
    if (draft.sources[field] === "manual") continue;
    next.values[field] = account?.[field] || "";
    next.sources[field] = account ? "account" : "empty";
  }
  return next;
}

export function editCheckoutField(draft, name, value) {
  return {
    ...draft,
    values: { ...draft.values, [name]: value },
    sources: name === "name" || name === "email"
      ? { ...draft.sources, [name]: "manual" }
      : draft.sources,
  };
}

export default function useCheckoutForm(user) {
  const [draft, setDraft] = useState(() => createCheckoutDraft(user));
  let current = draft;

  // Synchronize before children render, without a stale-account frame or effect.
  if (draft.account !== user) {
    current = syncCheckoutAccount(draft, user);
    setDraft(current);
  }

  function setFormData(values) {
    setDraft((previous) => ({ ...previous, values }));
  }

  function changeField(name, value) {
    setDraft((previous) => editCheckoutField(previous, name, value));
  }

  function resetForm() {
    setDraft(createCheckoutDraft(user));
  }

  return { formData: current.values, setFormData, changeField, resetForm };
}
