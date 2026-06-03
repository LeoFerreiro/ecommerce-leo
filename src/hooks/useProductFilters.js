import { useMemo, useState } from "react";

import { defaultProductFilters } from "../constants/productFilters";
import {
  filterProducts,
  getProductFilterOptions,
  sortProducts,
} from "../utils/productFilters";

function useProductFilters(products, initialFilters = {}) {
  const [filters, setFilters] = useState({
    ...defaultProductFilters,
    ...initialFilters,
  });

  const filterOptions = useMemo(
    () => getProductFilterOptions(products),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const matchingProducts = filterProducts(products, filters);
    return sortProducts(matchingProducts, filters.sort);
  }, [filters, products]);

  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters(defaultProductFilters);
  }

  return {
    filters,
    filterOptions,
    filteredProducts,
    updateFilter,
    resetFilters,
  };
}

export default useProductFilters;
