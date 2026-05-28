import HeroSlider from "../components/HeroSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <HeroSlider />

       {/* Search */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      <FeaturedProducts />

      <Categories />
    </div>
  );
}

export default Home;