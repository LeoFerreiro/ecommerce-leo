import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import useCart from "../hooks/useCart";

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
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-[9999] flex w-full flex-col overflow-hidden bg-white p-6 text-[#111813] shadow-2xl sm:w-[420px]"
          >
            <div className="flex items-center justify-between border-b border-[#d7e3d2] pb-4">
              <h2 className="text-2xl font-extrabold">Tu carrito</h2>

              <button
                onClick={closeCart}
                className="text-2xl transition hover:text-[#1f7a3a]"
              >
                <FaTimes />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-[#667369]">
                Tu carrito esta vacio
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto py-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-lg border border-[#d7e3d2] p-4"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#e8f3e5]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-[#1f7a3a]">
                          ${item.price}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d7e3d2] transition hover:border-[#1f7a3a]"
                          >
                            -
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d7e3d2] transition hover:border-[#1f7a3a]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 transition hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#d7e3d2] pt-6">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[#667369]">Total</span>
                    <span className="text-3xl font-extrabold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-lg bg-[#102116] py-4 text-center font-bold text-white transition hover:bg-[#1f7a3a]"
                  >
                    Finalizar compra
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
