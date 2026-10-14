import products from "../data/products.js";

export async function getProducts() {
  return products;
}

export async function getProduct(id) {
  return products.find((product) => product.id === Number(id));
}
