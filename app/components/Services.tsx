export default function ServicesSection() {
  const categories = [
    {
      title: "Individual Services",
      buttons: ["Individuals Registration", "Forgot Username / Password"],
      footer: "Public Services",
    },
    {
      title: "Individual Services",
      buttons: ["Establishments Registration", "Change Username"],
      footer: "Golden Services",
    },
    {
      title: "Individual Services",
      buttons: ["Typing Centers Registration", "Change Username"],
      footer: "Visa Services",
    },
  ]

  return (
<section className="bg-white py-8 md:py-16 px-4 md:px-8 w-[80%] md:w-full mx-auto">
      <div className="max-w-6xl lg:max-w-3xl lg:ml-70 mx-auto">
        {/* Top Section - Information */}
        <div className="mb-8 md:mb-12">
          <p className="text-slate-600 text-base font-medium mb-4 md:mb-6">
            Kindly note that registration in the Smart Services is available for the following categories:
          </p>
          <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 leading-relaxed">
            <li>Establishments</li>
            <li>Typing Centers</li>
            <li>Citizens of the United Arab Emirates and citizens of the Gulf Cooperation Council countries</li>
            <li>Residents of the United Arab Emirates and residents of the Gulf Cooperation Council countries</li>
            <li>Individuals under corporate sponsorship or the sponsorship of Excellencies the Sheikhs</li>
          </ul>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {categories.map((category, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 md:p-6 flex flex-col">
              {/* Card Header */}
              <h3 className="text-[#BC9C73] text-lg font-semibold text-center mb-4 md:mb-6">{category.title}</h3>

              {/* Buttons */}
              <div className="space-y-3 mb-6 md:mb-8">
                {category.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className="w-full bg-[#BC9C73] hover:bg-[#BC9C73] text-white font-medium py-3 px-4 rounded text-sm transition-colors"
                  >
                    {button}
                  </button>
                ))}
              </div>

              {/* Empty Space */}
              <div className="flex-grow border-t border-gray-200 my-4 md:my-6"></div>

              {/* Card Footer */}
              <p className="text-[#BC9C73] text-center font-medium text-base">{category.footer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}