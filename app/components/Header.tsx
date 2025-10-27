"use client"

export default function Header() {
  // Scroll to the login section smoothly
  const handleScrollToLogin = () => {
    const loginSection = document.getElementById("login-section")
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-white m-0 sm:m-24 sm:mt-0 sm:mb-4">
      {/* Top Banner Section */}
      <div className="flex items-center justify-between w-full px-2 sm:px-12 py-2 sm:py-4">
        {/* Left Logo Section */}
        <div className="flex items-center">
          <img
            src="/banner.png"
            alt="ICP Smart Services Header Banner"
            className="w-[350px] sm:w-[300px] md:w-[480px] lg:w-[560px] h-auto max-h-[80px] sm:max-h-[120px] object-contain"
          />
        </div>

        {/* Right UAE Emblem */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="United Arab Emirates Emblem"
            className="w-[50px] sm:w-[60px] md:w-[80px] lg:w-[100px] h-auto max-h-[80px] sm:max-h-[120px] object-contain"
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white px-2 sm:px-6 py-2 sm:py-3 flex flex-col lg:flex-row justify-between items-center gap-2 sm:gap-4 text-xs">
        {/* Left Menu - Grid Icon - Hidden on mobile, shown on lg */}
        <div className="hidden lg:flex items-center w-full lg:w-auto justify-center lg:justify-start">
          <button onClick={handleScrollToLogin} className="text-[#BC9373] hover:text-[#BC9373] p-2">
            <i className="fa fa-th !text-[20px]"></i>
          </button>
        </div>

        {/* Center Menu - Hidden on mobile, shown on lg */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-6 w-auto">
          {["Public Services", "Golden Services", "Public Visa Services"].map((item) => (
            <button
              key={item}
              onClick={handleScrollToLogin}
              className="text-gray-700 font-medium whitespace-nowrap hover:text-[#BC9373]"
            >
              {item}
            </button>
          ))}

          <button
            onClick={handleScrollToLogin}
            className="flex items-center space-x-1 text-gray-700 font-medium whitespace-nowrap hover:text-[#BC9373]"
          >
            <i className="fa fa-question-circle text-lg" style={{ color: "#BC9373" }}></i>
            <span>Help</span>
          </button>

          <button
            onClick={handleScrollToLogin}
            className="flex items-center space-x-1 text-gray-700 font-medium whitespace-nowrap hover:text-[#BC9373]"
          >
            <i className="fa fa-book text-lg" style={{ color: "#BC9373" }}></i>
            <span>User Manual</span>
          </button>
        </div>

        {/* Right Menu - Optimized for mobile */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-3 lg:gap-4 w-full lg:w-auto">
          <button
            onClick={handleScrollToLogin}
            className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap p-1 sm:p-0"
          >
            <i className="fa fa-globe text-lg"></i>
            <span className="hidden sm:inline">Translate</span>
          </button>

          <div className="border-l border-gray-300 pl-1 sm:pl-3 lg:pl-4">
            <button
              onClick={handleScrollToLogin}
              className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap p-1 sm:p-0"
            >
              <i className="fa fa-language text-lg"></i>
              <span className="hidden sm:inline">Arab</span>
            </button>
          </div>

          <button
            onClick={handleScrollToLogin}
            className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap p-1 sm:p-0"
          >
            <i className="fa fa-search text-lg"></i>
            <span className="hidden sm:inline">Public</span>
          </button>

          <button
            onClick={handleScrollToLogin}
            className="bg-gray-100 hover:bg-gray-200 text-[#BC9373] px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-md font-medium flex items-center whitespace-nowrap text-xs sm:text-sm"
          >
            <i className="fa fa-sign-in text-lg mr-0 sm:mr-1"></i>
            <span className="hidden sm:inline">Login</span>
          </button>

          <button
            onClick={handleScrollToLogin}
            className="bg-gray-100 hover:bg-gray-200 text-[#BC9373] px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-md font-medium flex items-center whitespace-nowrap text-xs sm:text-sm"
          >
            <i className="fa fa-cog text-lg mr-0 sm:mr-1"></i>
            <span className="hidden sm:inline">Setting</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
