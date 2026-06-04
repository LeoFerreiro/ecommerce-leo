import { useSearchParams } from "react-router-dom";

import ProductsGrid from "../components/ProductsGrid";
import ProductFilters from "../components/products/ProductFilters";
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
  const { products, loading, error } = useProducts();
  const {
    filters,
    filterOptions,
    filteredProducts,
    updateFilter,
    resetFilters,
  } = useProductFilters(products, initialFilters);

  return (
    <section className="section-shell section-stack">
      <ProductsHeader />

      <ProductFilters
        filterOptions={filterOptions}
        filters={filters}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        resultsCount={filteredProducts.length}
      />

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
    </section>
  );
}

export default Products;
