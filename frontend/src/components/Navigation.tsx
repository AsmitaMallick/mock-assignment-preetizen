"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const Navigation = () => {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-light tracking-[0.3em] text-black">
            PREETIZEN
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-12">
            <Link
              to="/our-story"
              className="text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
            >
              Our Story
            </Link>
            <Link
              to="/collections"
              className="text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
            >
              Wildflower Collection
            </Link>
            <Link
              to="/student-program"
              className="text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
            >
              Student Program
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm text-gray-600 font-light">Hello, {user.name}</span>
                <Link
                  to="/cart"
                  className="relative text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                >
                  Cart
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-light text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
