import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Tecnología Premium",
    subtitle:
      "Descubrí los mejores productos modernos.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },

  {
    id: 2,
    title: "Gaming Setup",
    subtitle:
      "Equipamiento profesional para gamers.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  },

  {
    id: 3,
    title: "Smart Devices",
    subtitle:
      "Innovación y diseño en un solo lugar.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

function HeroSlider() {
  return (
    <section className="px-6 pt-10">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-[40px] overflow-hidden"
      >

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>

            <div
              className="relative h-[700px]
              flex items-center"
            >

              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0
                w-full h-full object-cover"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0
                bg-black/50"
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10
                max-w-7xl mx-auto px-10 text-white"
              >

                <p className="text-violet-400 text-lg mb-6">
                  Ecommerce Premium
                </p>

                <h1
                  className="text-5xl md:text-7xl
                  font-extrabold leading-tight"
                >
                  {slide.title}
                </h1>

                <p
                  className="text-gray-300
                  text-lg md:text-xl
                  mt-8 max-w-2xl"
                >
                  {slide.subtitle}
                </p>

                <button
                  className="mt-10 px-8 py-4
                  rounded-full bg-violet-600
                  hover:bg-violet-700
                  transition font-semibold"
                >
                  Comprar ahora
                </button>

              </motion.div>

            </div>

          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
}

export default HeroSlider;