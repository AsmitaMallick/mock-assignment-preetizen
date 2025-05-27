"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const { user } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearCart = () => {
    if (showConfirm) {
      clearCart()
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Please login to view your cart</h2>
          <Link to="/login" className="bg-black text-white px-6 py-2 rounded">
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <Link to="/collections" className="bg-black text-white px-6 py-2 rounded">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-light mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 border-b pb-6">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-20 h-20 object-cover bg-gray-100"
            />

            <div className="flex-1">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.product_id, Math.max(0, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center border rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border rounded"
              >
                +
              </button>
            </div>

            <div className="text-lg font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>

            <button onClick={() => removeFromCart(item.product_id)} className="text-red-600 hover:text-red-800">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center text-xl font-medium mb-4">
          <span>Total: ₹{total.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleClearCart}
            className={`flex-1 border transition-colors py-3 px-6 rounded text-sm font-light uppercase tracking-widest ${
              showConfirm
                ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
                : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600"
            }`}
          >
            {showConfirm ? "Click Again to Confirm" : "Clear Cart"}
          </button>

          <Link
            to="/checkout"
            className="flex-1 bg-black text-white px-8 py-3 rounded hover:bg-gray-800 text-center text-sm font-light uppercase tracking-widest"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
