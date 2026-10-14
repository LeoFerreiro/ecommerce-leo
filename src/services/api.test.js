import assert from "node:assert/strict";
import { test } from "node:test";
import { getProduct } from "./api.js";

test("existing products resolve by their original numeric ID", async () => {
  assert.equal((await getProduct("7")).id, 7);
  assert.equal((await getProduct(13)).title, "Botines Nike Mercurial Vapor 14 Academy TF");
});

test("missing or invalid IDs resolve without a product", async () => {
  for (const id of ["999999", "invalid", "", undefined]) assert.equal(await getProduct(id), undefined);
});
