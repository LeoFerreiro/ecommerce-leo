import { BrowserRouter, Route, Routes } from "react-router-dom";

import CartDrawer from "./components/CartDrawer";
import DemoNotice from "./components/DemoNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import useAuth from "./hooks/useAuth";
import useCheckoutForm from "./hooks/useCheckoutForm";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {
  const { user } = useAuth();
  const checkoutForm = useCheckoutForm(user);

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#f5f7f2] text-[#111813]">
          <Navbar />
          <CartDrawer />

          <div className="h-[72px] lg:h-20" />
          <DemoNotice />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout checkoutForm={checkoutForm} />} />
            <Route path="/registro" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
