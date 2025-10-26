"use client"

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function VerificationCategories() {
  const categories = [
    { name: "Citizen", href: "/verificationform" },
    { name: "UAE Residents", href: "/verificationform" },
    { name: "GCC Citizens", href: "/verificationform" },
    { name: "GCC Residents", href: "/verificationform" },
    { name: "Visitors", href: "/verificationform" },
  ]

  return (
    <>
      <Header />
      <div className="w-full bg-white py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-xl md:text-2xl font-bold text-[#B48B5E] mb-6 md:mb-12 leading-relaxed text-center md:text-left">
            Please Note that verification is only available for these categories. Click any of the category below to start
            verification.
          </h1>

          {/* Categories List */}
          <div className="space-y-3 md:space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-[#B48B5E] text-sm">→</span>
                <a
                  href={category.href}
                  className="text-gray-600 hover:text-gray-700 hover:border-b-2 text-base md:text-lg font-bold transition-colors text-center md:text-left"
                >
                  {category.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}