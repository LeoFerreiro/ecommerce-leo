import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Gaming",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20",
  },

  {
    id: 2,
    title: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  {
    id: 3,
    title: "Wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },

  {
    id: 4,
    title: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Header */}
      <div className="mb-14">

        <p className="text-violet-600 font-medium">
          Categorías
        </p>

        <h2 className="text-5xl font-bold mt-4">
          Explorá por categoría
        </h2>

      </div>

      {/* Grid */}
      <div
        className="grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-8"
      >

        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-[32px]
            overflow-hidden cursor-pointer
            group h-[400px]"
          >

            {/* Image */}
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0
              w-full h-full object-cover
              group-hover:scale-110
              transition duration-700"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0
              bg-black/40"
            />

            {/* Content */}
            <div
              className="relative z-10
              h-full flex items-end p-8"
            >

              <div>

                <p className="text-gray-300 mb-2">
                  Colección
                </p>

                <h3 className="text-3xl font-bold text-white">
                  {category.title}
                </h3>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default Categories;