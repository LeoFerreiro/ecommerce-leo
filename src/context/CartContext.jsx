import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  createContext,
  useState,
} from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

  const [isCartOpen, setIsCartOpen] = useState(false);

  function openCart() {
  setIsCartOpen(true);
}

function closeCart() {
  setIsCartOpen(false);
}

useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

}, [cartItems]);

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
      toast.success("Producto agregado al carrito");

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
  toast.success("Producto agregado");
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
  toast.error("Producto reducido");
}

  // Remove
  function removeFromCart(id) {

    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
    toast.info("Producto eliminado");
  }

  function clearCart() {
  setCartItems([]);
  localStorage.removeItem("cart");
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
    clearCart,
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