import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Gaming",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
  },
  {
    id: 2,
    title: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 3,
    title: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 4,
    title: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
];

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="font-semibold text-violet-600">Categorias</p>

        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Explora por categoria
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative h-[320px] overflow-hidden rounded-lg"
          >
            <Link to="/products" className="block h-full">
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 flex h-full items-end p-8">
                <div>
                  <p className="mb-2 text-gray-300">Coleccion</p>

                  <h3 className="text-3xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
