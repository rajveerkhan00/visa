import { Mail, Globe } from "lucide-react"

export default function Footer() {
  return (
<footer className="mb-14 mt-0 bg-slate-100">
        {/* Navigation Links */}
      <div className="border-t border-gray-200 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm">
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              FAQ
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Happiness Formula
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Site Map
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Contact Us
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Archive
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              ICA Email
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Supplier's Inquiries
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Help
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-200 py-6 md:py-8 mb-6 mt-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Left: Federal Authority Info */}
            <div className="text-center md:text-left order-1">
              <p className="text-[#BC9C73] text-xs md:text-sm font-semibold mb-2">Federal Authority | الهيئة الاتحادية</p>
              <p className="text-[#BC9C73] text-base md:text-lg font-semibold">53,82,919</p>
              <p className="text-[#BC9C73] text-xs">Visitors</p>
            </div>

            {/* Center: Social Media Icons */}
            <div className="flex justify-center gap-2 md:gap-3 order-3 md:order-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#BC9C73] hover:bg-[#a58862] transition-colors cursor-pointer flex items-center justify-center"
                >
                  {i === 4 && <Globe className="text-white w-3.5 h-3.5 md:w-4.5 md:h-4.5" />}
                  {i === 5 && <Mail className="text-white w-3.5 h-3.5 md:w-4.5 md:h-4.5" />}
                </div>
              ))}
            </div>

            {/* Right: Call Center Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-between gap-3 md:gap-4 order-2 md:order-3">
              {/* Call Center Text */}
              <div className="text-center md:text-right mb-3 sm:mb-0">
                <p className="text-[#BC9C73] text-xs md:text-sm font-semibold mb-1">Call Center</p>
                <p className="text-[#BC9C73] text-xl md:text-2xl font-bold">600522222</p>
                <p className="text-[#BC9C73] text-xs">Available 24/7</p>
              </div>

              {/* Image Section */}
              <div className="flex gap-2">
                <img
                  src="/footer-image-1.png"
                  alt="Call Center Icon"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
                <img
                  src="/footer-image-2.png"
                  alt="Call Center Icon"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-gray-200 py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs">
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Accessibility
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Disclaimer
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Terms & Conditions
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Privacy Policy
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              Copyright
            </a>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#" className="text-[#BC9C73] hover:text-[#a58862] whitespace-nowrap">
              ICA Terminology
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}