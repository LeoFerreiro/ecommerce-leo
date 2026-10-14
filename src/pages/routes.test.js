import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { parseSync } from "@babel/core";
import { matchRoutes } from "react-router-dom";

function elements(file, name) {
  const ast = parseSync(readFileSync(new URL(file, import.meta.url), "utf8"), { configFile: false, babelrc: false, parserOpts: { plugins: ["jsx"] } });
  const found = [];
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "JSXElement" && node.openingElement.name.name === name) found.push(node);
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === "object") visit(value);
    }
  }
  visit(ast);
  return found;
}

const routes = elements("../App.jsx", "Route").map(node => ({
  path: node.openingElement.attributes.find(a => a.name?.name === "path").value.value,
  screen: node.openingElement.attributes.find(a => a.name?.name === "element").value.expression.openingElement.name.name,
}));

test("unknown routes match the configured NotFound screen", () => {
  for (const path of ["/no-existe", "/products/desconocido"]) assert.equal(matchRoutes(routes, path).at(-1).route.screen, "NotFound");
  assert.equal(elements("./NotFound.jsx", "PageEmptyState").length, 1);
});

test("existing route destinations are preserved", () => {
  for (const [path, screen] of [["/", "Home"], ["/products", "Products"], ["/product/7", "ProductDetails"], ["/product/999999", "ProductDetails"], ["/cart", "Cart"], ["/checkout", "Checkout"], ["/registro", "Register"]]) assert.equal(matchRoutes(routes, path).at(-1).route.screen, screen);
});
