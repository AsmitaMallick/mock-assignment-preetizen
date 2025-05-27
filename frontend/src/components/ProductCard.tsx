"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (user) {
      addToCart(product)
    }
  }

  return (
    <div className="group product-card">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-light tracking-wide uppercase">{product.name}</h3>
          <p className="text-gray-900 font-light">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
      </Link>

      {user && (
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-black text-white py-3 px-4 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default ProductCard
