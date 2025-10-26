"use client"

import Header from '../components/Header'
import Footer from '../components/Footer'
import type React from "react"
import { useState } from "react"
import { collection, addDoc, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useRouter } from 'next/navigation'

interface FormData {
  name: string;
  uaePass: string;
  mobileNumber: string;
  email: string;
}

export default function CompulsoryVerification() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    uaePass: "",
    mobileNumber: "",
    email: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      uaePass: value,
    }))
  }

  const generateUID = () => {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      // Generate a unique UID for this user
      const uid = generateUID()
      
      // Store data in "users" database, document name "firstform", with UID as a field
      const firstformDocRef = doc(db, "users", "firstform")
      await setDoc(firstformDocRef, {
        [uid]: {
          ...formData,
          uid: uid,
          createdAt: serverTimestamp(),
          status: "pending"
        }
      }, { merge: true })

      // Store the UID in the "userid" document as an array to collect ALL UIDs
      const useridDocRef = doc(db, "users", "userid")
      await setDoc(useridDocRef, {
        uids: arrayUnion(uid) // This will add the UID to an array without overwriting
      }, { merge: true })

      console.log("Form submitted:", formData)
      console.log("Data stored with UID: ", uid)
      
      setMessage("Form submitted successfully!")
      
      // Reset form after successful submission
      setFormData({
        name: "",
        uaePass: "",
        mobileNumber: "",
        email: "",
      })

      // Navigate to idcard page WITH THE UID
      router.push(`/idcard?uid=${uid}`)

    } catch (error) {
      console.error("Error adding document: ", error)
      setMessage("Error submitting form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-2xl">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#B48B5E] mb-2 text-center sm:text-left">Compulsory Verification</h1>
          <div className="h-1 bg-[#B48B5E] mb-6 sm:mb-8 w-full"></div>

          {/* Success/Error Message */}
          {message && (
            <div className={`p-4 mb-4 rounded-md ${
              message.includes("Error") 
                ? "bg-red-100 text-red-700 border border-red-300" 
                : "bg-green-100 text-green-700 border border-green-300"
            }`}>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B48B5E] focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* UAE Pass Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-3">Are you registered with UAE Pass? *</label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="uaePass"
                    value="yes"
                    checked={formData.uaePass === "yes"}
                    onChange={(e) => handleRadioChange(e.target.value)}
                    className="w-4 h-4 text-[#B48B5E] cursor-pointer"
                    required
                    disabled={loading}
                  />
                  <span className="ml-2 text-gray-800 text-sm sm:text-base">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="uaePass"
                    value="no"
                    checked={formData.uaePass === "no"}
                    onChange={(e) => handleRadioChange(e.target.value)}
                    className="w-4 h-4 text-[#B48B5E] cursor-pointer"
                    required
                    disabled={loading}
                  />
                  <span className="ml-2 text-gray-800 text-sm sm:text-base">No</span>
                </label>
              </div>
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B48B5E] focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email Address Field */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B48B5E] focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#B48B5E] text-white font-semibold rounded-md hover:bg-[#a37a52] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {loading ? "SUBMITTING..." : "START VERIFICATION"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}