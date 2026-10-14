import assert from "node:assert/strict";
import { test } from "node:test";
import { createCheckoutDraft, editCheckoutField, syncCheckoutAccount } from "./useCheckoutForm.js";

const account = { name: "Demo A", email: "demo-a@example.com" };
const otherAccount = { name: "Demo B", email: "demo-b@example.com" };

test("guest starts empty and an account prefills untouched fields", () => {
  const guest = createCheckoutDraft(null);
  assert.deepEqual(guest.values, { name: "", email: "", address: "" });
  assert.deepEqual(syncCheckoutAccount(guest, account).values, { ...account, address: "" });
});

test("logout clears inherited fields, not the manually entered address", () => {
  const draft = editCheckoutField(createCheckoutDraft(account), "address", "Ficticia 123");
  assert.deepEqual(syncCheckoutAccount(draft, null).values, { name: "", email: "", address: "Ficticia 123" });
});

test("manual values survive logout even when identical to account values", () => {
  for (const editedFields of [["name"], ["email"], ["name", "email"]]) {
    let draft = createCheckoutDraft(account);
    for (const field of editedFields) draft = editCheckoutField(draft, field, account[field]);
    const loggedOut = syncCheckoutAccount(draft, null);
    for (const field of ["name", "email"]) {
      assert.equal(loggedOut.values[field], editedFields.includes(field) ? account[field] : "");
    }
  }
});

test("new accounts never overwrite guest manual fields, including intentionally empty ones", () => {
  let draft = editCheckoutField(createCheckoutDraft(null), "name", "Invitado");
  draft = editCheckoutField(draft, "email", "");
  assert.deepEqual(syncCheckoutAccount(draft, otherAccount).values, { name: "Invitado", email: "", address: "" });
});

test("account replacement updates inherited fields but preserves manual fields", () => {
  const draft = editCheckoutField(createCheckoutDraft(account), "email", "manual@example.com");
  assert.deepEqual(syncCheckoutAccount(draft, otherAccount).values, { name: otherAccount.name, email: "manual@example.com", address: "" });
});

test("fresh forms cannot inherit the old account or its draft", () => {
  assert.deepEqual(createCheckoutDraft(null).values, { name: "", email: "", address: "" });
  assert.deepEqual(createCheckoutDraft(otherAccount).values, { ...otherAccount, address: "" });
});
