'use client';

export default function HeroSearchSection() {
  const handleScrollToLogin = () => {
    const section = document.getElementById('login-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-b from-amber-100 to-teal-100 py-12 md:py-16 w-[80%] md:w-full mx-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-1">
            <h3 className="text-3xl md:text-4xl font-bold text-[#BC9C73] mb-4">
              Golden Services
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              for Federal Authority For Identity, Citizenship, Customs & Port Security
            </p>
            <button
              onClick={handleScrollToLogin}
              className="bg-white text-gray-900 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition shadow-md w-full md:w-auto"
            >
              Click Here
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center order-2">
            <img
              src="/Main-image.png"
              alt="Main Services"
              className="max-w-xs md:max-w-md w-full h-auto"
            />
          </div>
        </div>

        {/* Quick Search Section */}
        <div className="max-w-full mt-8 md:mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="text-[#BC9C73] font-semibold text-base whitespace-nowrap w-full sm:w-auto text-center sm:text-left">
                Quick Search
              </label>
              <input
                type="text"
                placeholder="Request Number / PRAN / Id Number"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm w-full"
              />
              <button className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition text-sm w-full sm:w-auto">
                Inquiry
              </button>
            </div>
          </div>

          <div className="h-4 md:h-6 bg-[#BC9C73] rounded-b-lg shadow-lg"></div>
        </div>
      </div>
    </section>
  );
}
