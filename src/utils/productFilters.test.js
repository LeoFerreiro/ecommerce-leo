import assert from "node:assert/strict";
import { test } from "node:test";
import products from "../data/products.js";
import { defaultProductFilters } from "../constants/productFilters.js";
import { filterProducts } from "./productFilters.js";

const find = (overrides = {}, catalog = products) => filterProducts(catalog, { ...defaultProductFilters, ...overrides });

test("empty maximum leaves prices unlimited", () => {
  for (const maxPrice of ["", "  ", undefined, null]) assert.deepEqual(find({ maxPrice }), products);
});

test("zero maximum is a real inclusive limit, including numeric zero", () => {
  for (const maxPrice of ["0", 0]) {
    assert.deepEqual(find({ maxPrice }), []);
    const free = { ...products[0], price: 0 };
    assert.deepEqual(find({ maxPrice }, [free, products[0]]), [free]);
  }
});

test("positive maximum is inclusive", () => {
  assert.deepEqual(find({ maxPrice: "74999" }), products.filter(p => p.price <= 74999));
});

test("maximum combines with minimum, brand, audience and search", () => {
  assert.deepEqual(find({ minPrice: "50000", maxPrice: "100000", brand: "Nike", audience: "mujer", search: "Swoosh" }).map(p => p.id), [4]);
  assert.deepEqual(find({ maxPrice: "0", brand: "Nike" }), []);
});

test("invalid prices and reversed bounds never remove the limit silently", () => {
  for (const maxPrice of ["abc", "Infinity", Infinity, NaN, "-1", true, {}]) assert.deepEqual(find({ maxPrice }), []);
  assert.deepEqual(find({ minPrice: "bad" }), []);
  assert.deepEqual(find({ minPrice: "100000", maxPrice: "50000" }), []);
});
