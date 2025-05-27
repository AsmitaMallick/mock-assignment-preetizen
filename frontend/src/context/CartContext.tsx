"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

interface CartItem {
  id: number
  product_id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: any) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const { user } = useAuth()
  const API_URL = "http://localhost:8000"

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setItems([])
    }
  }, [user])

  const fetchCart = async () => {
    if (!user) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setItems(data.items || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  const addToCart = async (product: any) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCart()
        // Optional: Show success message
        console.log('Item added to cart successfully')
      } else {
        console.error('Failed to add item to cart:', data.detail)
        alert(data.detail || 'Failed to add item to cart')
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert('Error adding item to cart')
    }
  }

  const removeFromCart = async (productId: number) => {
    if (!user) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
        }),
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setItems([])
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
