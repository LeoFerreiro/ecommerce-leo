import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import { CartProvider } from "./context/CartContext";
import useTheme from "./hooks/useTheme";

import CartDrawer from "./components/CartDrawer";

function App() {
  const { theme } = useTheme();
  return (
    
    <CartProvider>
      <BrowserRouter>
      <div
  className={`
    min-h-screen
    transition-colors
    duration-300
    relative
    ${
      theme === "dark"
        ? "bg-[#020617] text-white"
        : "bg-[#F8FAFC] text-[#0F172A]"
    }
  `}
>

        <Navbar />
        <CartDrawer />

        <div className="h-16" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/registro" element={<Register />} />
        </Routes>

        <Footer />

      </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
