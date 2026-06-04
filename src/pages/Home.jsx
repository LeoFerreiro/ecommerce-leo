import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BrandSportSections from "../components/BrandSportSections";
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
    <main>
      <HeroSlider />

      <form
        onSubmit={handleSearchSubmit}
        className="section-shell relative z-20 mt-10 max-w-3xl"
      >
        <SearchBar search={search} setSearch={setSearch} />
      </form>

      <FeaturedProducts />
      <Categories />
      <BrandSportSections />
    </main>
  );
}

export default Home;
