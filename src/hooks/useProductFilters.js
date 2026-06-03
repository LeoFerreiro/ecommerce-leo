import { useMemo, useState } from "react";

const initialFilters = {
  search: "",
  category: "all",
  sort: "featured",
  minPrice: "",
  maxPrice: "",
};

function useProductFilters(products, initialSearch = "") {
  const [filters, setFilters] = useState({
    ...initialFilters,
    search: initialSearch,
  });

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;
    const normalizedSearch = filters.search.trim().toLowerCase();

    const matchesFilters = products.filter((product) => {
      const title = product.title.toLowerCase();
      const description = product.description?.toLowerCase() || "";
      const category = product.category.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        category.includes(normalizedSearch);

      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    return [...matchesFilters].sort((a, b) => {
      if (filters.sort === "price-asc") {
        return a.price - b.price;
      }

      if (filters.sort === "price-desc") {
        return b.price - a.price;
      }

      if (filters.sort === "name") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });
  }, [filters, products]);

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return {
    filters,
    categories,
    filteredProducts,
    updateFilter,
    resetFilters,
  };
}

export default useProductFilters;
