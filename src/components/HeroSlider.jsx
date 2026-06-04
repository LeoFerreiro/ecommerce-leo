import { Link } from "react-router-dom";

import SafeImage from "./common/SafeImage";

function HeroSlider() {
  return (
    <section className="section-shell pt-10">
      <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-[#102116]">
        <SafeImage
          src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1800&q=80"
          alt="Indumentaria deportiva premium"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#08120c] via-[#08120c]/70 to-transparent" />

        <div className="relative z-10 flex min-h-[560px] max-w-2xl flex-col justify-center px-6 py-16 text-white md:px-12">
          <p className="mb-5 font-semibold text-[#88d68f]">
            Nueva temporada deportiva
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Indumentaria, calzado y accesorios para moverte mejor.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/80">
            Colecciones para hombre, mujer y kids con seleccion de Nike,
            Adidas, Puma y mas marcas para entrenamiento, running y lifestyle.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/products?promo=launch"
              className="rounded-lg bg-[#59c36a] px-6 py-4 font-bold text-[#102116] transition hover:bg-white"
            >
              Ver lanzamientos
            </Link>
            <Link
              to="/products?promo=sale"
              className="rounded-lg border border-white/30 px-6 py-4 font-bold text-white transition hover:border-white hover:bg-white hover:text-[#102116]"
            >
              Comprar sale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
