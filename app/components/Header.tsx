'use client';

export default function Header() {
  return (
    <header className="bg-white m-24 mt-0 mb-4">
      {/* Top Banner Section */}
   <div className="flex items-center justify-between w-full h-auto px-4 sm:px-6 py-4">
  {/* Left Logo Section */}
  <div className="flex items-center">
    <img 
      src="/banner.png" 
      alt="ICP Smart Services Header Banner" 
      className="w-[80vw] sm:w-[480px] md:w-[560px] h-auto max-h-[120px] object-contain"
    />
  </div>

  {/* Right UAE Emblem */}
  <div className="flex items-center">
    <img 
      src="/logo.png" 
      alt="United Arab Emirates Emblem" 
      className="w-[20vw] sm:w-[80px] md:w-[100px] h-auto max-h-[120px] object-contain"
    />
  </div>
</div>


      {/* Navigation Bar */}
      <nav className="bg-white px-4 sm:px-6 py-3 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs">
        {/* Left Menu - Grid Icon */}
<div className="hidden lg:flex items-center w-full lg:w-auto justify-center lg:justify-start">
          <button className="text-[#BC9373] hover:text-[#BC9373] p-2">
            <i className="fa fa-th !text-[20px]"></i>
          </button>
        </div>

        {/* Center Menu - Only visible on large screens */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-6 w-auto">
          {/* Navigation Links */}
          {['Public Services', 'Golden Services', 'Public Visa Services'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-gray-700 font-medium whitespace-nowrap"
            >
              {item}
            </a>
          ))}
          
          {/* Help and User Manual */}
          <a href="#" className="flex items-center space-x-1 text-gray-700 font-medium whitespace-nowrap">
            <i className="fa fa-question-circle text-lg" style={{ color: '#BC9373' }}></i>
            <span>Help</span>
          </a>

          <a href="#" className="flex items-center space-x-1 text-gray-700 font-medium whitespace-nowrap">
            <i className="fa fa-book text-lg" style={{ color: '#BC9373' }}></i>
            <span>User Manual</span>
          </a>
        </div>

        {/* Right Menu - Icons only on small screens, with text on larger screens */}
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-4 w-full lg:w-auto">
          <a href="#" className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap">
            <i className="fa fa-globe text-lg"></i>
            <span className="hidden sm:inline">Translate</span>
          </a>
          
          <div className="border-l border-gray-300 pl-3 lg:pl-4">
            <a href="#" className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap">
              <i className="fa fa-language text-lg"></i>
              <span className="hidden sm:inline">Arab</span>
            </a>
          </div>
          
          <a href="#" className="flex items-center space-x-1 text-[#BC9373] hover:text-[#BC9373] font-medium whitespace-nowrap">
            <i className="fa fa-search text-lg"></i>
            <span className="hidden sm:inline">Public</span>
          </a>
          
          <button className="bg-gray-100 hover:bg-gray-200 text-[#BC9373] px-3 lg:px-4 py-2 rounded-md font-medium flex items-center whitespace-nowrap">
            <i className="fa fa-sign-in text-lg mr-1"></i>
            <span className="hidden sm:inline">Login</span>
          </button>
          
          <button className="bg-gray-100 hover:bg-gray-200 text-[#BC9373] px-3 lg:px-4 py-2 rounded-md font-medium flex items-center whitespace-nowrap">
            <i className="fa fa-cog text-lg mr-1"></i>
            <span className="hidden sm:inline">Setting</span>
          </button>
        </div>
      </nav>
    </header>
  );
}