import { Link } from "react-router-dom";

import { brandShortcuts, sportShortcuts } from "../config/homeSections";

function BrandSportSections() {
  return (
    <section className="bg-[#102116] py-24 text-white">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-semibold text-[#88d68f]">Marcas y deportes</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Elegi por marca favorita o por la forma en que entrenas.
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-xl font-bold">Marcas</h3>
            <div className="grid gap-3">
              {brandShortcuts.map((brand) => (
                <Link
                  key={brand.label}
                  to={brand.to}
                  className="rounded-lg bg-white px-4 py-3 font-bold text-[#102116] transition hover:bg-[#88d68f]"
                >
                  {brand.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h3 className="mb-4 text-xl font-bold">Deportes</h3>
            <div className="grid gap-3">
              {sportShortcuts.map((sport) => (
                <Link
                  key={sport.label}
                  to={sport.to}
                  className="rounded-lg border border-white/15 px-4 py-3 font-bold text-white transition hover:border-[#88d68f] hover:text-[#88d68f]"
                >
                  {sport.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandSportSections;
