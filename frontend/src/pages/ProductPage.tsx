"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
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

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()

  const API_URL = "http://localhost:8000"

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product && user) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-lg font-light text-gray-600">Loading product...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Product not found</h2>
          <Link to="/collections" className="text-black underline font-light">
            Return to collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/collections" className="text-gray-500 hover:text-black font-light text-sm uppercase tracking-wide">
            Collections
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            to={`/collections/${product.category}`}
            className="text-gray-500 hover:text-black font-light text-sm uppercase tracking-wide"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black font-light text-sm uppercase tracking-wide">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl font-extralight mb-4 tracking-wider uppercase">{product.name}</h1>
              <p className="text-3xl font-light text-gray-900">₹{product.price}</p>
            </div>

            <p className="text-gray-600 font-light leading-relaxed text-lg">{product.description}</p>

            {user ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-light uppercase tracking-wide">Quantity:</label>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 px-8 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 font-light">Please login to add items to cart</p>
                <Link
                  to="/login"
                  className="inline-block bg-black text-white py-4 px-8 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
