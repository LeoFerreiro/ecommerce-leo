export const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const WOMEN_SHOE_SIZES = ["35", "36", "37", "38", "39", "40", "41", "42"];
export const MEN_SHOE_SIZES = ["37", "38", "39", "40", "41", "42", "43", "44", "45"];
export const KIDS_SHOE_SIZES = ["28", "29", "30", "31", "32", "33", "34"];

export function getAvailableSizes(product) {
  if (product.group === "indumentaria") {
    return APPAREL_SIZES;
  }

  if (product.group !== "calzado") {
    return [];
  }

  if (product.audience === "mujer") {
    return WOMEN_SHOE_SIZES;
  }

  if (product.audience === "hombre") {
    return MEN_SHOE_SIZES;
  }

  return KIDS_SHOE_SIZES;
}

export function productRequiresSize(product) {
  return getAvailableSizes(product).length > 0;
}

export function getSizeStock(product, size) {
  if (!size) {
    return 0;
  }

  return product.stockBySize?.[size] ?? product.stock ?? 0;
}

export function getTotalStock(product) {
  if (!product.stockBySize) {
    return product.stock ?? 0;
  }

  return Object.values(product.stockBySize).reduce(
    (total, stock) => total + stock,
    0
  );
}

export function formatAvailableSizes(sizes) {
  if (sizes.length === 0) {
    return "Talle unico";
  }

  return sizes.join(" / ");
}
