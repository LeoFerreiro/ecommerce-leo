import {
  defaultProductFilters,
  productFilterQueryKeys,
  productSearchKeys,
} from "../constants/productFilters";

export function getUniqueValues(products, key) {
  return [...new Set(products.map((product) => product[key]).filter(Boolean))];
}

export function getInitialFiltersFromSearchParams(searchParams) {
  return productFilterQueryKeys.reduce((filters, key) => {
    const value = searchParams.get(key);

    if (!value) {
      return filters;
    }

    return {
      ...filters,
      [key]: value,
    };
  }, defaultProductFilters);
}

export function getProductFilterOptions(products) {
  return {
    audiences: getUniqueValues(products, "audience"),
    groups: getUniqueValues(products, "group"),
    types: getUniqueValues(products, "type"),
    brands: getUniqueValues(products, "brand"),
    sports: getUniqueValues(products, "sport"),
    categories: getUniqueValues(products, "category"),
  };
}

export function filterProducts(products, filters) {
  const minPrice = Number(filters.minPrice) || 0;
  const maxPrice = Number(filters.maxPrice) || Infinity;
  const normalizedSearch = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    const searchableText = productSearchKeys
      .map((key) => product[key])
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch || searchableText.includes(normalizedSearch);

    const matchesAudience =
      filters.audience === "all" || product.audience === filters.audience;

    const matchesGroup =
      filters.group === "all" || product.group === filters.group;

    const matchesType =
      filters.type === "all" || product.type === filters.type;

    const matchesBrand =
      filters.brand === "all" || product.brand === filters.brand;

    const matchesSport =
      filters.sport === "all" || product.sport === filters.sport;

    const matchesPromo =
      filters.promo === "all" ||
      (filters.promo === "launch" && product.isLaunch) ||
      (filters.promo === "sale" && product.isSale);

    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;

    return (
      matchesSearch &&
      matchesAudience &&
      matchesGroup &&
      matchesType &&
      matchesBrand &&
      matchesSport &&
      matchesPromo &&
      matchesPrice
    );
  });
}

export function sortProducts(products, sort) {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") {
      return a.price - b.price;
    }

    if (sort === "price-desc") {
      return b.price - a.price;
    }

    if (sort === "name") {
      return a.title.localeCompare(b.title);
    }

    return Number(b.isLaunch) - Number(a.isLaunch);
  });
}
