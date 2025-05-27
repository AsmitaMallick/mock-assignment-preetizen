import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import Navigation from "./components/Navigation"
import HomePage from "./pages/HomePage"
import CollectionsPage from "./pages/CollectionsPage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import OurStoryPage from "./pages/OurStoryPage"
import StudentProgramPage from "./pages/StudentProgramPage"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:category" element={<CollectionsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/student-program" element={<StudentProgramPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
