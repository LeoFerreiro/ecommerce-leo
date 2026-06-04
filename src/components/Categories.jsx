import { Link } from "react-router-dom";

import { audienceSections, categoryShortcuts } from "../config/homeSections";

function Categories() {
  return (
    <section className="section-shell py-24">
      <div className="mb-12">
        <p className="font-semibold text-[#1f7a3a]">Secciones</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
          Compra por estilo, deporte o categoria
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {audienceSections.map((section) => (
          <Link
            key={section.title}
            to={section.to}
            className="group relative min-h-[360px] overflow-hidden rounded-lg bg-[#102116]"
          >
            <img
              src={section.image}
              alt={section.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08120c] via-[#08120c]/30 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-7 text-white">
              <h3 className="text-3xl font-extrabold">{section.title}</h3>
              <p className="mt-2 text-white/75">{section.text}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categoryShortcuts.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="rounded-lg border border-[#d7e3d2] bg-white px-4 py-4 text-center font-bold text-[#102116] transition hover:border-[#1f7a3a] hover:bg-[#e8f3e5]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
