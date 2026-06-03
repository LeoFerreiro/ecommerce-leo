import { useSearchParams } from "react-router-dom";

import ProductsGrid from "../components/ProductsGrid";
import ProductFilters from "../components/products/ProductFilters";
import ProductsEmptyState from "../components/products/ProductsEmptyState";
import ProductsHeader from "../components/products/ProductsHeader";
import ProductsLoadingGrid from "../components/products/ProductsLoadingGrid";
import useProductFilters from "../hooks/useProductFilters";
import useProducts from "../hooks/useProducts";
import useTheme from "../hooks/useTheme";

function Products() {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const { products, loading, error } = useProducts();
  const {
    filters,
    categories,
    filteredProducts,
    updateFilter,
    resetFilters,
  } = useProductFilters(products, searchParams.get("search") || "");

  return (
    <section className="w-full px-8 py-20 md:px-10 xl:px-16">
      <ProductsHeader />

      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
        resultsCount={filteredProducts.length}
      />

      {error && (
        <div
          className={`mb-8 rounded-lg border p-4 ${
            theme === "dark"
              ? "border-red-500/30 bg-red-500/10 text-red-100"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
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
