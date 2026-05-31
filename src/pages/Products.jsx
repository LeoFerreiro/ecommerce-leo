import { useEffect, useState } from "react";

import ProductsGrid from "../components/ProductsGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

import { getProducts } from "../services/api";



function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  useEffect(() => {

    async function loadProducts() {

      setLoading(true);

      const data = await getProducts();

      setProducts(data);

      setLoading(false);
    }

    loadProducts();

  }, []);

  // Categories
  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  // Filtered Products
  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="w-full px-6 md:px-10 xl:px-16 py-20">

      {/* Header */}
      <div className="mb-14">

        <h1 className="text-5xl font-bold mt-4">
          Nuestra colección
        </h1>

      </div>

      {/* Search */}
      <div className="mb-10">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Products */}
      {loading ? (

        <div
          className="grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8"
        >

          {[...Array(8)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}

        </div>

      ) : (

        <ProductsGrid products={filteredProducts} />

      )}

    </section>
  );
}

export default Products;