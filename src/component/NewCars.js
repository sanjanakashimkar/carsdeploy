'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Star, Car, Fuel, Users, X, MapPin, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const carouselItems = [
  {
    id: 2,
    title: "Find your perfect match!",
    image: "https://i.pinimg.com/564x/c8/8f/be/c88fbe77a159916b106a7b7701dceaa9.jpg",
  },
  {
    id: 3,
    title: "Drive into luxury!",
    image: "https://i.pinimg.com/564x/fb/45/8b/fb458b377c9b8b8026d507cbfc88460f.jpg",
  },
  {
    id: 4,
    title: "Unique Cars for Unique Individuals!",
    image: "https://i.pinimg.com/564x/99/b3/6f/99b36f188456d5803af49264c373e23d.jpg",
  },
]

const logos = [
  { name: 'Maruti Suzuki', logo: 'https://i.pinimg.com/564x/80/0d/e2/800de2b4b41959f70be86e6c7454272c.jpg' },
  { name: 'Hyundai', logo: 'https://i.pinimg.com/564x/28/7c/4e/287c4e8a85379f2f8be2558f25bb04d1.jpg' },
  { name: 'Tata', logo: 'https://i.pinimg.com/564x/08/cc/c9/08ccc9d69f4b03e923c676c2a4822010.jpg' },
  { name: 'Mahindra', logo: 'https://i.pinimg.com/564x/be/d8/95/bed895c865a5c777452f22528da075ad.jpg' },
  { name: 'Toyota', logo: 'https://i.pinimg.com/564x/5f/31/43/5f3143a273dd854adfb9ec5fd8c185df.jpg' },
  { name: 'Kia', logo: 'https://i.pinimg.com/564x/b6/31/b7/b631b7dd261b8bc31d9168988b245fc8.jpg' },
  { name: 'Honda', logo: 'https://i.pinimg.com/564x/0b/f4/f3/0bf4f346b871684d0c407deb488e287a.jpg' },
  { name: 'MG', logo: 'https://i.pinimg.com/564x/4f/4e/44/4f4e449638357ea884a2c65ffed2f486.jpg' },
  { name: 'Renault', logo: 'https://i.pinimg.com/564x/4b/58/da/4b58da0ffeafd9b2a0c5326f228543ee.jpg' },
  { name: 'Volkswagen', logo: 'https://i.pinimg.com/564x/bb/15/29/bb152936c727e607711d7ea276cbc6d3.jpg' },
  { name: 'Skoda', logo: 'https://i.pinimg.com/564x/8e/74/79/8e74797514263c201bd31eac942ae7b4.jpg' },
  { name: 'Nissan', logo: 'https://i.pinimg.com/564x/d9/3a/e4/d93ae4c990f9b91391060feb9c01e151.jpg' },
  { name: 'Citroen', logo: 'https://i.pinimg.com/564x/c1/5d/75/c15d752abb0259e6b2dc130e85df50d8.jpg' },
  { name: 'Jeep', logo: 'https://i.pinimg.com/564x/73/ce/c1/73cec10db0311207b5028b25e194b80c.jpg' },
  { name: 'Aston Martin', logo: 'https://i.pinimg.com/564x/8c/1e/5f/8c1e5f4340f124d095541636e4dcb5c9.jpg' },
  { name: 'Audi', logo: 'https://i.pinimg.com/564x/26/9a/ec/269aec6bc2ac6381bf47b78819748aa1.jpg'},
]

const carData = {
  SUV: [
    { name: 'Mahindra Thar ROXX', price: '₹ 12.99 - 22.49 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Nexon', price: '₹ 8 - 15.50 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg', link: '/deals/rangerover' },
    { name: 'Mahindra Thar', price: ' ₹ 11.35 - 17.60 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar/10745/1697697308167/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Curvv', price: '₹ 10 - 19 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Curvv/9578/1723033064164/front-left-side-47.jpg' }
  ],
  Luxury: [
    { name: 'Mercedes-Benz GLA', price: '₹ 51.75 - 58.15 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Kia EV6', price: '₹ 60.97 - 65.97 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/EV6/8947/1654159762071/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Land Rover Defender', price: '₹ 1.04 - 1.57 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Defender/9081/Land-Rover-Defender-3.0-Diesel-110-X-Dynamic-HSE/1720674556929/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Land Rover Range Rover', price: ' ₹ 2.36 - 4.98 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Range-Rover/11540/1719037980777/front-left-side-47.jpg', link: '/deals/ev6' }
  ],
  MUV: [
    { name: 'Maruti Ertiga', price: 'Rs8.69 - 13.03 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1697697779799/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Toyota Innova Crysta', price: 'Rs19.99 - 26.30 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Renault Triber', price: '₹ Rs6 - 8.97 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/Triber/10066/1717586026066/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Maruti XL6', price: '₹ 11.61 - 14.77 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/XL6/10384/1688385191052/front-left-side-47.jpg', link: '/deals/ev6' }
  ]
}

export  function NewCars() {
  const [visibleBrands, setVisibleBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Luxury')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    carNumber: '',
    brand: '',
    year: '',
    model: '',
    variant: '',
    regState: '',
    kms: '',
    customerName: '',
    customerEmail: '',
    ownerName: '',
    carLocation: '',
    sellingPrice: '',
    phone: '',
    sellingTimeline: '',
    whatsappUpdates: false,
    carImages: [null, null, null, null],
  })

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsModalOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleBrands((prev) => {
        if (prev.length < logos.length) {
          return [...prev, logos[prev.length]]
        }
        return prev
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsModalOpen(false)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateFormData = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }))
    nextStep()
  }

  const popularBrands = [
    { name: 'Maruti Suzuki', logo: '/maruti.png' },
    { name: 'Hyundai', logo: '/hyundai.png' },
    { name: 'Mahindra', logo: '/mahindra.png' },
    { name: 'Tata', logo: '/tata.png' },
    { name: 'Honda', logo: '/honda.png' },
    { name: 'Toyota', logo: '/toyota.png' },
    { name: 'Ford', logo: '/ford.png' },
    { name: 'Renault', logo: '/renault.png' }
  ]

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016']
  const models = ['Swift', 'Baleno', 'Ertiga', 'Swift Dzire', 'Wagon R 1.0']
  const variants = ['VXI O [2014 - 2018]', 'DLX [2016-2017]', 'LXI (O) [2014 - 2018]', 'LXI [2014 - 2018]']
  const rtoCodes = ['MH-49', 'MH-12', 'MH-02', 'MH-04', 'MH-14', 'MH-01', 'MH-43', 'MH-03']
  const kmsRanges = [
    '0 - 10,000 Km',
    '10,000 - 20,000 Km',
    '20,000 - 30,000 Km',
    '30,000 - 40,000 Km',
    '40,000 - 50,000 Km',
    '50,000 - 60,000 Km'
  ]

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({ 
            ...prev, 
            carLocation: `Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}` 
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-lg w-full max-w-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col h-full max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center p-4 border-b bg-orange-600 text-white">
                  <button onClick={prevStep} className="p-2" disabled={step === 1}>
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="flex-1 text-center text-lg font-medium">
                    {step === 1 ? 'Enter your car details' : 'Sell Your Car'}
                  </h1>
                  <button onClick={() => setIsModalOpen(false)} className="p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex px-4 py-2 bg-gray-100 overflow-x-auto">
                  {['Brand', 'Year', 'Model', 'Variant', 'Reg. state', 'Kms Driven', 'Car Images', 'Car location', 'Selling Price', 'Customer Info', 'Phone Number', 'Selling Timeline'].map((label, i) => (
                    <div
                      key={label}
                      className={`flex-shrink-0 text-center text-xs px-2 ${
                        i + 1 === step ? 'text-orange-600 font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Form Steps */}
                <div className="flex-1 overflow-y-auto p-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          type="text"
                          name="carNumber"
                          placeholder="DL 01 AB12XX"
                          value={formData.carNumber}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-2xl text-center uppercase"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                            IND
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={nextStep}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        GET CAR PRICE
                      </button>
                      <div className="text-center text-gray-500">Or</div>
                      <div>
                        <h3 className="text-lg font-medium mb-4 text-center">Start with your car brand</h3>
                        <div className="grid grid-cols-4 gap-4">
                          {popularBrands.map((brand) => (
                            <button
                              key={brand.name}
                              onClick={() => updateFormData('brand', brand.name)}
                              className="p-4 border rounded-lg flex flex-col items-center gap-2 hover:bg-gray-50"
                            >
                              <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                              <span className="text-xs text-center">{brand.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search manufacturing year"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      />
                      <div className="space-y-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => updateFormData('year', year)}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <input
                        type="text"
                        placeholder="Search Car Models"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      />
                      <h3 className="font-medium mb-2">Popular Models</h3>
                      <div className="space-y-2">
                        {models.map((model) => (
                          <button
                            key={model}
                            onClick={() => updateFormData('model', model)}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            {model}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="font-medium mb-2">Select variant</h3>
                      <div className="space-y-2">
                        {variants.map((variant) => (
                          <button
                            key={variant}
                            onClick={() => updateFormData('variant', variant)}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h3 className="font-medium">Maharashtra</h3>
                      </div>
                      <input
                        type="text"
                        name="regState"
                        placeholder="MH-"
                        value={formData.regState}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      />
                      <h3 className="font-medium mb-2">Popular RTO Codes</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {rtoCodes.map((code) => (
                          <button
                            key={code}
                            onClick={() => updateFormData('regState', code)}
                            className="p-2 text-center border rounded-lg hover:bg-gray-50"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div>
                      <h3 className="font-medium mb-4">Kilometers driven</h3>
                      <div className="space-y-2">
                        {kmsRanges.map((range) => (
                          <button
                            key={range}
                            onClick={() => updateFormData('kms', range)}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="space-y-6">
                      <h3 className="font-medium mb-4">Upload Car Images</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                          <div key={index} className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {formData.carImages[index] ? (
                              <>
                                <img
                                  src={URL.createObjectURL(formData.carImages[index])}
                                  alt={`Car image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => {
                                    const newImages = [...formData.carImages];
                                    newImages[index] = null;
                                    setFormData(prev => ({ ...prev, carImages: newImages }));
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <label htmlFor={`image-upload-${index}`} className="cursor-pointer text-center p-4">
                                <div className="text-4xl text-gray-400 mb-2">+</div>
                                <p className="text-sm text-gray-500">Upload Image</p>
                                <input
                                  type="file"
                                  id={`image-upload-${index}`}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const newImages = [...formData.carImages];
                                      newImages[index] = e.target.files[0];
                                      setFormData(prev => ({ ...prev, carImages: newImages }));
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={nextStep}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 8 && (
                    <div className="space-y-6">
                      <h3 className="font-medium mb-4">Car location</h3>
                      <div className="relative">
                        <input
                          type="text"
                          name="carLocation"
                          placeholder="Enter your city"
                          value={formData.carLocation}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                        />
                        <button 
                          onClick={getCurrentLocation}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-800"
                        >
                          <MapPin className="w-6 h-6" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Click the location icon to use your current location
                      </p>
                      <button
                        onClick={nextStep}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 9 && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-lg p-6 border">
                        <h3 className="text-xl font-semibold mb-4">Enter your Selling Price</h3>
                        <div className="mb-6">
                          <p className="text-gray-600 mb-2">What's your expected selling price?</p>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="sellingPrice"
                            placeholder="Enter amount"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all pl-8 bg-gray-50"
                          />
                        </div>
                      </div>
                      <button
                        onClick={nextStep}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 10 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Customer and Owner Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Email
                          </label>
                          <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Name
                          </label>
                          <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <button
                        onClick={nextStep}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 11 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 border-b pb-4">
                        <img
                          src="/placeholder.svg?height=48&width=48"
                          alt="Maruti Suzuki"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">Maruti Suzuki, LXI O</h3>
                          <p className="text-sm text-gray-600">2024 | Petrol | MH-32</p>
                        </div>
                        <button className="ml-auto text-blue-600 text-sm">EDIT</button>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2Enter your phone number"></h3>
                        // <p className="text-sm text-gray-600 mb-4">We will save the offer for you</p>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                        />

                        <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                          <input
                            type="checkbox"
                            name="whatsappUpdates"
                            checked={formData.whatsappUpdates}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          Get instant updates from CarsNagpur on your WhatsApp
                        </label>

                        <button
                          onClick={nextStep}
                          className="w-full py-4 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          GET CAR PRICE
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          We respect your privacy and your information is secure with us
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 12 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">When are you planning to sell your car?</h3>

                      <div className="mb-6">
                        {/* Removed phone number input as per update 2 */}
                      </div>

                      {['Within this week', 'By next week', 'After 2 weeks', 'Just checking price'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            updateFormData('sellingTimeline', option);
                            handleSubmit({ preventDefault: () => {} });
                          }}
                          className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px]  overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={item.image} alt={item.title} className="object-cover w-full h-full" />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* Carousel content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              {/* Carousel Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 text-center">
                {item.title}
              </h1>

              {/* Search Input */}
              <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-6 md:mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Explore by brand, model or budget"
                    className="w-full py-2 sm:py-3 px-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Browse Section */}
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Browse cars by</h2>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  {[
                    { icon: Star, text: 'Brands' },
                    { icon: Car, text: 'Body Type' },
                    { icon: Fuel, text: 'Fuel Type' },
                    { icon: Users, text: 'Seating Capacity' },
                  ].map((button, index) => (
                    <button
                      key={index}
                      className="flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                    >
                      {React.createElement(button.icon, { className: 'w-4 h-4 sm:w-5 sm:h-5 mr-2' })}
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Brands in the Spotlight</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={isMounted ? { opacity: 0, y: 20 } : false}
                animate={isMounted ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-slate-300 transition-shadow duration-300"
              >
                <img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  className="w-20 h-16 object-contain mb-2 hover:filter transition-all duration-300"
                />
                <p className="text-sm font-medium text-center">{logo.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Find Right Cars by Body Type</h2>

        <div className="flex justify-center space-x-6 mb-6">
          {Object.keys(carData).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-lg font-semibold px-4 py-2 ${
                selectedCategory === category
                  ? 'text-orange-600 border-b-4 border-orange-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carData[selectedCategory].map((car, index) => (
            <div
              key={index}
              className="bg-slate-200 p-4 rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-gray-600">{car.price}</p>
                <a
                  href={car.link}
                  className="inline-block mt-4 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  View Deal
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewCars