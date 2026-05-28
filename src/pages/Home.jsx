import HeroSlider from "../components/HeroSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");

  return (

    <main className="pt-10">

    <div>
      <HeroSlider />

       {/* Search */}
      <div className="max-w-3xl mx-auto px-6 relative z-20">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      <FeaturedProducts />

      <Categories />
    </div>

    </main>
  );
}

export default Home;