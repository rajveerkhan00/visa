export default function SmartServices() {
  const services = [
    {
      number: "01",
      title: "Citizens",
      image: "/landing-img-1.png",
    },
    {
      number: "02",
      title: "UAE Residents",
      image: "/landing-img-2.png",
    },
    {
      number: "03",
      title: "GCC Citizens",
      image: "/landing-img-3.png",
    },
    {
      number: "04",
      title: "Visitors",
      image: "/landing-img-4.png",
    },
  ]

  const infoCards = [
    {
      title: "Open Data",
      description: "Comprehensive and simple data",
    },
    {
      title: "Service Card",
      description: "Knowledge database of provider services and its channels.",
    },
    {
      title: "Customer Happiness Centers",
      description: "Customer happiness centers map along the country.",
    },
  ]

  return (
<section className="bg-white py-8 md:py-16 px-4 md:px-8 w-[80%] md:w-full mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-[#BC9C73] text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Smart Services</h2>

        {/* Image Grid */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-0 border-b-4 md:border-b-8 border-[#BC9C73]">
          {services.map((service, index) => (
            <div key={index} className="flex-1 relative h-48 sm:h-64 md:h-80 lg:h-110 overflow-hidden group">
              {/* Background Image */}
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              {/* Number */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 text-[#BC9C73] text-2xl md:text-3xl lg:text-5xl font-bold">{service.number}</div>
              {/* Title */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-black text-base md:text-xl font-semibold lg:mb-77">{service.title}</div>
            </div>
          ))}
        </div>

        {/* Info Cards Section */}
        <div className="max-w-7xl mx-auto px-0 md:px-4 py-8 md:py-12 mb-12 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {/* Open Data Card */}
            <div className="bg-gray-100 p-4 md:p-6 rounded">
              <h3 className="text-[#BC9C73] font-semibold text-base md:text-lg mb-2">Open Data</h3>
              <p className="text-gray-800 text-sm">Comprehensive and simple data</p>
            </div>

            {/* Service Card */}
            <div className="bg-gray-100 p-4 md:p-6 rounded">
              <h3 className="text-[#BC9C73] font-semibold text-base md:text-lg mb-2">Service Card</h3>
              <p className="text-gray-800 text-sm">Knowledge database of provider services and its channels.</p>
            </div>

            {/* Customer Happiness Centers Card */}
            <div className="bg-gray-100 p-4 md:p-6 rounded">
              <h3 className="text-[#BC9C73] font-semibold text-base md:text-lg mb-2">Customer Happiness Centers</h3>
              <p className="text-gray-800 text-sm">Customer happiness centers map along the country.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}