import { motion, AnimatePresence } from "framer-motion";

import { FaTimes, FaTrash } from "react-icons/fa";

import useCart from "../hooks/useCart";

import { useEffect } from "react";


function CartDrawer() {

  const {
  isCartOpen,
  closeCart,
  cartItems,
  removeFromCart,

  increaseQuantity,
  decreaseQuantity,

} = useCart();

  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  useEffect(() => {

    if (isCartOpen) {

    document.body.style.overflow = "hidden";

    } else {

    document.body.style.overflow = "auto";
    }

     return () => {
    document.body.style.overflow = "auto";
    };

    }, [isCartOpen]);


  return (

    <AnimatePresence>

      {isCartOpen && (

        <>

          {/* Overlay */}
          <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={closeCart}

            className="
            fixed inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            overflow-hidden
            "
          />

          {/* Drawer */}
          <motion.div

            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}

            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}

            className="
            fixed top-0 right-0
            bottom-0
            w-full sm:w-[380px]
            bg-white
            z-[9999]
            shadow-2xl
            box-border p-6
            flex flex-col
            overflow-x-hidden
            "
          >

            {/* Header */}
            <div
              className="
              flex items-center
              justify-between
              border-b border-black/10
              pb-4
              "
            >

              <h2 className="text-2xl font-bold">
                Tu carrito
              </h2>

              <button
                onClick={closeCart}
                className="
                text-2xl
                hover:text-violet-600
                transition
                "
              >
                <FaTimes />
              </button>

            </div>

            {/* Empty */}
            {cartItems.length === 0 ? (

              <div
                className="
                flex-1
                flex items-center justify-center
                text-gray-500
                "
              >
                Tu carrito está vacío
              </div>

            ) : (

              <>
                {/* Items */}
                <div
                  className="
                  flex-1
                  min-h-0
                  overflow-y-auto
                  overflow-x-hidden
                  p-6
                  space-y-4
                  "
                >

                  {cartItems.map((item) => (

                    <div
                      key={item.id}
                      className="
                      flex gap-4
                      border border-black/5
                      rounded-2xl
                      p-4
                      "
                    >

                      <div
                        className="
                        w-20 h-20
                        bg-gray-100
                        rounded-xl
                        p-2
                        shrink-0
                        "
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                          w-full h-full
                          object-contain
                          "
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <h3
                          className="
                          font-semibold
                          line-clamp-2
                          "
                        >
                          {item.title}
                        </h3>

                        <p className="text-violet-600 mt-2">
                          ${item.price}
                        </p>

                        <div
                            className="
                            flex items-center
                            gap-3
                            mt-3
                            "
                        >

                        <button
                            onClick={() =>
                            decreaseQuantity(item.id)
                            }
                            className="
                            w-8 h-8
                            rounded-full
                            border border-black/10
                            flex items-center justify-center
                            hover:bg-gray-100
                            transition
                            "
                        >
                            -
                        </button>

                        <span className="font-semibold">
                            {item.quantity}
                        </span>

                        <button
                            onClick={() =>
                            increaseQuantity(item.id)
                            }
                            className="
                            w-8 h-8
                            rounded-full
                            border border-black/10
                            flex items-center justify-center
                            hover:bg-gray-100
                            transition
                            "
                        >
                            +
                        </button>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="
                        text-red-500
                        hover:text-red-700
                        transition
                        "
                      >
                        <FaTrash />
                      </button>

                    </div>

                  ))}

                </div>

                {/* Footer */}
                <div
                  className="
                  border-t border-black/10
                  pt-6
                  "
                >

                  <div
                    className="
                    flex items-center
                    justify-between
                    mb-6
                    "
                  >

                    <span className="text-gray-500">
                      Total
                    </span>

                    <span className="text-3xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>

                  </div>

                  <button
                    className="
                    w-full
                    bg-violet-600
                    hover:bg-violet-700
                    text-white
                    py-4 rounded-2xl
                    transition
                    font-semibold
                    "
                  >
                    Finalizar compra
                  </button>

                </div>

              </>

            )}

          </motion.div>

        </>

      )}

    </AnimatePresence>
  );

}

export default CartDrawer;