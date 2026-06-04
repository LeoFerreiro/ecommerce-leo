import {
  getAvailableSizes,
  getSizeStock,
  getTotalStock,
  productRequiresSize,
} from "../constants/productSizes";
import products from "../data/products";

const CART_STORAGE_KEY = "cart";
const productsById = new Map(products.map((product) => [product.id, product]));

function getStorage() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage;
}

function createCartLineId(product, selectedSize) {
  return `${product.id}-${selectedSize || "default"}`;
}

export function getCartItemKey(item) {
  return item.lineId || createCartLineId(item, item.selectedSize);
}

function toPositiveInteger(value) {
  const quantity = Number(value);

  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity));
}

function normalizeCartItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const product = productsById.get(Number(item.id));

  if (!product) {
    return null;
  }

  const requiresSize = productRequiresSize(product);
  const selectedSize = requiresSize ? String(item.selectedSize || "") : "";

  if (requiresSize && !getAvailableSizes(product).includes(selectedSize)) {
    return null;
  }

  const availableStock = requiresSize
    ? getSizeStock(product, selectedSize)
    : getTotalStock(product);

  if (availableStock <= 0) {
    return null;
  }

  return {
    ...product,
    selectedSize,
    lineId: createCartLineId(product, selectedSize),
    stock: availableStock,
    quantity: Math.min(toPositiveInteger(item.quantity), availableStock),
  };
}

export function sanitizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const cartLines = new Map();

  items.forEach((item) => {
    const normalizedItem = normalizeCartItem(item);

    if (!normalizedItem) {
      return;
    }

    const lineId = getCartItemKey(normalizedItem);
    const existingLine = cartLines.get(lineId);

    if (!existingLine) {
      cartLines.set(lineId, normalizedItem);
      return;
    }

    cartLines.set(lineId, {
      ...existingLine,
      quantity: Math.min(
        existingLine.quantity + normalizedItem.quantity,
        normalizedItem.stock
      ),
    });
  });

  return [...cartLines.values()];
}

export function loadStoredCart() {
  const storage = getStorage();

  if (!storage) {
    return [];
  }

  try {
    const savedCart = storage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    return sanitizeCartItems(JSON.parse(savedCart));
  } catch {
    try {
      storage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore storage cleanup errors in demo mode.
    }

    return [];
  }
}

export function saveStoredCart(cartItems) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(sanitizeCartItems(cartItems))
    );
  } catch {
    // The cart is demo-only, so storage failures should never break the UI.
  }
}

export function clearStoredCart() {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(CART_STORAGE_KEY);
  } catch {
    // Ignore storage errors in demo mode.
  }
}

export { createCartLineId };
