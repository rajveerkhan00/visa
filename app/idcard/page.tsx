import { Suspense } from 'react'
import EmiratesIDClearance from './EmiratesIDClearance'

export default function IDCardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B48B5E] mx-auto"></div>
          <p className="mt-4 text-slate-700">Loading ID verification...</p>
        </div>
      </div>
    }>
      <EmiratesIDClearance />
    </Suspense>
  )
}