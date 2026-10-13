import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductsGrid from "../components/ProductsGrid";
import CatalogFilters from "../components/products/CatalogFilters";
import CatalogToolbar from "../components/products/CatalogToolbar";
import ProductsEmptyState from "../components/products/ProductsEmptyState";
import ProductsHeader from "../components/products/ProductsHeader";
import ProductsLoadingGrid from "../components/products/ProductsLoadingGrid";
import useProductFilters from "../hooks/useProductFilters";
import useProducts from "../hooks/useProducts";
import { getInitialFiltersFromSearchParams } from "../utils/productFilters";

function Products() {
  const [searchParams] = useSearchParams();

  return (
    <ProductsCatalog
      key={searchParams.toString()}
      initialFilters={getInitialFiltersFromSearchParams(searchParams)}
    />
  );
}

function ProductsCatalog({ initialFilters }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const closeFilters = useCallback(() => setIsFiltersOpen(false), []);
  const searchInputRef = useRef(null);
  const { products, loading, error } = useProducts();
  const {
    filters,
    filterOptions,
    filteredProducts,
    updateFilter,
    resetFilters,
  } = useProductFilters(products, initialFilters);

  return (
    <section className="section-shell catalog-page">
      <ProductsHeader />
      <div className="catalog-layout">
        <CatalogToolbar
          filters={filters}
          onFilterChange={updateFilter}
          resultsCount={filteredProducts.length}
          isFiltersOpen={isFiltersOpen}
          onOpenFilters={() => setIsFiltersOpen(true)}
          searchInputRef={searchInputRef}
        />
        <CatalogFilters
          isOpen={isFiltersOpen}
          onClose={closeFilters}
          fallbackFocusRef={searchInputRef}
          resultsCount={filteredProducts.length}
          filterOptions={filterOptions}
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
        <div className="catalog-results">
          {error && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              {error}
            </div>
          )}

          {loading ? (
            <ProductsLoadingGrid />
          ) : filteredProducts.length > 0 ? (
            <ProductsGrid products={filteredProducts} />
          ) : (
            <ProductsEmptyState onResetFilters={resetFilters} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
