"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"

const StudentProgramPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    studentId: "",
    course: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Student application:", formData)
    alert("Application submitted! We'll verify your student status and send you the discount code within 24-48 hours.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl font-extralight text-gray-900 mb-8 tracking-wider leading-tight">
                STYLE SMARTER.
                <br />
                <span className="font-light">SAVE BETTER.</span>
              </h1>
              <div className="space-y-6 text-lg font-light text-gray-600 leading-relaxed">
                <p className="text-xl font-medium text-black">Introducing the Preetizen Student Program</p>
                <p>We're on a mission to make slow and meaningful fashion more affordable — starting with students.</p>
                <p>
                  If you're a school/college/university student, you can now get <strong>15% off</strong> on your
                  Preetizen order (only applicable on one order per student)
                </p>
              </div>
              <Link
                to="#apply"
                className="inline-block mt-8 bg-black text-white px-6 py-3 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Discount */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extralight text-gray-900 mb-12 tracking-wider">How to Get Your Discount:</h2>

          <div className="space-y-8 text-lg font-light text-gray-600">
            <div className="flex items-start space-x-4">
              <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <p className="text-left">Fill out a quick form with your student details</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <p className="text-left">We'll verify your student status</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <p className="text-left">
                If approved your exclusive coupon code will be sent in your email within 24-48 hours!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight text-gray-900 mb-6 tracking-wider">Student Discount Form</h2>
            <p className="text-lg font-light text-gray-600">
              Fill out the form below to apply for your student discount
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
              <input
                type="text"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your school/college/university name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID *</label>
              <input
                type="text"
                name="studentId"
                required
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your student ID number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course/Program *</label>
              <input
                type="text"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your course or program name"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 px-6 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-light mb-6 tracking-wide">Ready to Shop?</h3>
          <p className="text-lg text-gray-600 font-light mb-8 leading-relaxed">
            Explore our Wildflower Collection and find pieces that speak to your authentic self.
          </p>
          <Link
            to="/collections"
            className="inline-block bg-black text-white px-8 py-4 text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-widest"
          >
            Shop Wildflower Collection
          </Link>
        </div>
      </section>
    </div>
  )
}

export default StudentProgramPage
