import { FaTrash } from "react-icons/fa";

import useCart from "../hooks/useCart";

function Cart() {

  const {
    cartItems,
    removeFromCart,
  } = useCart();

  // Total
  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  return (

    <section
      className="
      w-full
      px-6 md:px-10 xl:px-16
      py-20
      overflow-x-hidden
      "
    >

      {/* Header */}
      <div className="mb-14">

        <h1 className="text-5xl font-bold mt-4">
          Tus productos
        </h1>

      </div>

      {/* Empty */}
      {cartItems.length === 0 ? (

        <div
          className="
          bg-white rounded-3xl
          border border-black/5
          p-20 text-center
          "
        >

          <h2 className="text-3xl font-bold">
            Tu carrito está vacío
          </h2>

          <p className="text-gray-500 mt-4">
            Agregá productos para continuar.
          </p>

        </div>

      ) : (

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-10
          "
        >

          {/* Products */}
          <div className="xl:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="
                bg-white rounded-3xl
                border border-black/5
                p-6
                flex flex-col md:flex-row
                gap-6
                overflow-hidden
                "
              >

                {/* Image */}
                <div
                  className="
                  w-full md:w-32
                  h-32
                  bg-gray-100
                  rounded-2xl
                  flex items-center justify-center
                  p-4 shrink-0
                  "
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />

                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">

                  <p className="text-violet-600 text-sm">
                    {item.category}
                  </p>

                  <h2
                    className="
                    text-xl font-semibold
                    mt-2 break-words
                    "
                  >
                    {item.title}
                  </h2>

                  <div
                    className="
                    flex items-center
                    justify-between
                    mt-6
                    "
                  >

                    <div>

                      <p className="text-gray-500">
                        Cantidad
                      </p>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="text-right">

                      <p className="text-2xl font-bold">
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Delete */}
                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="
                  text-red-500
                  hover:text-red-700
                  transition
                  shrink-0
                  "
                >

                  <FaTrash />

                </button>

              </div>

            ))}

          </div>

          {/* Summary */}
          <div
            className="
            bg-white rounded-3xl
            border border-black/5
            p-8
            h-fit
            "
          >

            <h2 className="text-3xl font-bold">
              Resumen
            </h2>

            <div
              className="
              flex items-center
              justify-between
              mt-8
              "
            >

              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>

            </div>

            <button
              className="
              w-full mt-10
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

        </div>

      )}

    </section>
  );
}

export default Cart;