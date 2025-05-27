"use client"

import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import FeaturedCollections from "../components/FeaturedCollections"

const HomePage = () => {
  const location = useLocation()
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message)
      // Clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000)
    }
  }, [location.state])

  return (
    <div>
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-center">{message}</div>
      )}
      <Hero />
      <FeaturedCollections />
    </div>
  )
}

export default HomePage
