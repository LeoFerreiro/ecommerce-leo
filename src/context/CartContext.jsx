import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  getSizeStock,
  getTotalStock,
  productRequiresSize,
} from "../constants/productSizes";
import {
  clearStoredCart,
  createCartLineId,
  getCartItemKey,
  loadStoredCart,
  saveStoredCart,
  sanitizeCartItems,
} from "../utils/cartStorage";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    saveStoredCart(cartItems);
  }, [cartItems]);

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function addToCart(product, selectedSize = "") {
    const totalStock = getTotalStock(product);

    if (totalStock <= 0) {
      toast.error("Producto sin stock disponible");
      return;
    }

    if (productRequiresSize(product) && !selectedSize) {
      toast.info("Elegi un talle antes de agregar el producto");
      return;
    }

    const availableStock = productRequiresSize(product)
      ? getSizeStock(product, selectedSize)
      : totalStock;

    if (availableStock <= 0) {
      toast.error(`No hay stock disponible en talle ${selectedSize}`);
      return;
    }

    const lineId = createCartLineId(product, selectedSize);
    const existingProduct = cartItems.find(
      (item) => getCartItemKey(item) === lineId
    );

    if (existingProduct && existingProduct.quantity >= availableStock) {
      toast.error(`Solo hay ${availableStock} unidades disponibles`);
      return;
    }

    if (existingProduct) {
      setCartItems((items) =>
        sanitizeCartItems(
          items.map((item) =>
            getCartItemKey(item) === lineId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  selectedSize,
                  lineId,
                  stock: availableStock,
                }
              : item
          )
        )
      );
    } else {
      setCartItems((items) =>
        sanitizeCartItems([
          ...items,
          {
            ...product,
            selectedSize,
            lineId,
            stock: availableStock,
            quantity: 1,
          },
        ])
      );
    }

    toast.success("Producto agregado al carrito");
  }

  function increaseQuantity(lineId) {
    const safeCartItems = sanitizeCartItems(cartItems);
    const itemToIncrease = safeCartItems.find(
      (item) => getCartItemKey(item) === lineId
    );

    if (!itemToIncrease) {
      setCartItems(safeCartItems);
      return;
    }

    if (itemToIncrease.quantity >= itemToIncrease.stock) {
      toast.error(`Solo hay ${itemToIncrease.stock} unidades disponibles`);
      return;
    }

    setCartItems(
      sanitizeCartItems(
        safeCartItems.map((item) =>
          getCartItemKey(item) === lineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    );
    toast.success("Producto agregado");
  }

  function decreaseQuantity(lineId) {
    setCartItems((items) =>
      sanitizeCartItems(
        items
          .map((item) =>
            getCartItemKey(item) === lineId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      )
    );
    toast.info("Producto reducido");
  }

  function removeFromCart(lineId) {
    setCartItems((items) =>
      sanitizeCartItems(
        items.filter((item) => getCartItemKey(item) !== lineId)
      )
    );
    toast.info("Producto eliminado");
  }

  function clearCart() {
    setCartItems([]);
    clearStoredCart();
  }

  const safeCartItems = useMemo(() => sanitizeCartItems(cartItems), [cartItems]);

  const totalItems = useMemo(
    () => safeCartItems.reduce((total, item) => total + item.quantity, 0),
    [safeCartItems]
  );

  const subtotal = useMemo(
    () =>
      safeCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [safeCartItems]
  );

  const value = {
    cartItems: safeCartItems,
    addToCart,
    removeFromCart,
    totalItems,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartItemKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider, CartContext };
