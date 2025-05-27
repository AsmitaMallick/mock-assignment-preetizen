"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

const CollectionsPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const API_URL ="http://localhost:8000"

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Always fetch all products since we're using wildflower collection
      const url = `${API_URL}/products`

      const response = await fetch(url)
      const data = await response.json()

      console.log("Fetched products:", data)
      setProducts(data.products || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-lg font-light text-gray-600">Loading collection...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with diverse models image */}
      <div className="relative h-96 bg-gray-100">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-extralight mb-4 tracking-[0.2em]">WILDFLOWER COLLECTION</h1>
            <p className="text-xl font-light">Style for everyone, every body, every story</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {products.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm text-gray-500 font-light">
                {products.length} {products.length === 1 ? "piece" : "pieces"} in our collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-light text-gray-900 mb-4">Collection Coming Soon</h3>
            <p className="text-gray-600 font-light mb-8">
              We're carefully curating our Wildflower Collection. Check back soon for beautiful, inclusive pieces.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionsPage
