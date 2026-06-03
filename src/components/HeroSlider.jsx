import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Tecnologia Premium",
    subtitle: "Descubri productos elegidos para trabajar, jugar y crear mejor.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 2,
    title: "Gaming Setup",
    subtitle: "Equipamiento profesional para gamers.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  },
  {
    id: 3,
    title: "Smart Devices",
    subtitle: "Innovacion y diseno en un solo lugar.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

function HeroSlider() {
  return (
    <section className="px-4 pt-6 sm:px-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="overflow-hidden rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-[520px] items-center md:min-h-[620px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-slate-950/60" />

              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 mx-auto max-w-7xl px-6 text-white md:px-10"
              >
                <p className="mb-5 text-sm font-semibold text-violet-300 md:text-base">
                  LeoStore Demo
                </p>

                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
                  {slide.subtitle}
                </p>

                <Link
                  to="/products"
                  className="mt-9 inline-flex rounded-lg bg-violet-600 px-7 py-4 font-semibold text-white transition hover:bg-violet-700"
                >
                  Comprar ahora
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;
