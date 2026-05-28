import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";

import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    
    <CartProvider>
      <BrowserRouter>
      <div className="min-h-screen
                      bg-[#F8FAFC]
                      text-[#0F172A]
                      relative"
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
        </Routes>

        <Footer />

      </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;