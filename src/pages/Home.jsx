import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSlider from "../components/HeroSlider";
import SearchBar from "../components/SearchBar";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      return;
    }

    navigate("/products");
  }

  return (
    <main className="pt-10">
      <HeroSlider />

      <form
        onSubmit={handleSearchSubmit}
        className="relative z-20 mx-auto mt-[-32px] max-w-3xl px-8 md:px-10"
      >
        <SearchBar search={search} setSearch={setSearch} />
      </form>

      <FeaturedProducts />
      <Categories />
    </main>
  );
}

export default Home;
