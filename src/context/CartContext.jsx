import {
  createContext,
  useState,
} from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
  setIsCartOpen(true);
}

function closeCart() {
  setIsCartOpen(false);
}

  // Add To Cart
  function addToCart(product) {

    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {

      const updatedCart = cartItems.map((item) => {

        if (item.id === product.id) {

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function increaseQuantity(id) {

  const updatedCart = cartItems.map((item) => {

    if (item.id === id) {

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }

    return item;
  });

  setCartItems(updatedCart);
}

function decreaseQuantity(id) {

  const updatedCart = cartItems
    .map((item) => {

      if (item.id === id) {

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    })
    .filter((item) => item.quantity > 0);

  setCartItems(updatedCart);
}

  // Remove
  function removeFromCart(id) {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
  }

  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    isCartOpen,
    openCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export {
  CartProvider,
  CartContext,
};