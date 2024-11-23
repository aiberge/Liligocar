'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Users, 
  Settings, 
  ChevronRight, 
  Phone, 
  X, 
  Copy, 
  MessageCircle, 
  Clock, 
  Car, 
  Shield, 
  Heart, 
  Sparkles,
  Wallet,
  Wrench,
  Baby
} from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define the Car typeco
type Car = {
  id: number;
  name: string;
  version: string;
  type: string;
  color: string;
  price: number;
  image: string;
  featured: boolean;
  transmission: string;
  seats: number;
  luggage: number;
  airConditioning: boolean;
  mileage: string;
  maxSpeed: number;
  trunkSize: number;
}
const cars: Car[] = [
  { 
    id: 1, 
    name: 'Kia Picanto', 
    version: 'Base', 
    type: 'Économique', 
    color: 'Bleu', 
    price: 250, 
    image: '/kia.jpg', 
    featured: true,
    transmission: 'Manuelle',
    seats: 4,
    luggage: 2,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 160,
    trunkSize: 255
  },
  { 
    id: 2, 
    name: 'Mercedes Classe C', 
    version: 'Luxury Edition', 
    type: 'Luxe', 
    color: 'Noir', 
    price: 500, 
    image: '/mercedes.jpg', 
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 250,
    trunkSize: 455
  },
  { 
    id: 3, 
    name: 'Renault Clio', 
    version: 'Classic', 
    type: 'Économique', 
    color: 'Rouge', 
    price: 280, 
    image: '/clio.jpeg', 
    featured: false,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 2,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 180,
    trunkSize: 300
  },
  { 
    id: 4, 
    name: 'Peugeot 308', 
    version: 'Sport', 
    type: 'Compacte', 
    color: 'Gris', 
    price: 350, 
    image: '/OIP.jpeg', 
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 210,
    trunkSize: 420
  },
  { 
    id: 5, 
    name: 'Volkswagen Golf', 
    version: 'GTI', 
    type: 'Compacte', 
    color: 'Blanc', 
    price: 320, 
    image: '/R.jpeg', 
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 250,
    trunkSize: 380
  },
  { 
    id: 6, 
    name: 'Dacia Duster', 
    version: 'Adventure', 
    type: 'SUV', 
    color: 'Vert', 
    price: 290, 
    image: '/dacia.jpeg', 
    featured: true,
    transmission: 'Manuelle',
    seats: 5,
    luggage: 4,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 180,
    trunkSize: 620
  },
  { 
    id: 7, 
    name: 'Audi A4', 
    version: 'Premium', 
    type: 'Luxe', 
    color: 'Argent', 
    price: 510, 
    image: '/audi a4.jpg', 
    featured: true,
    transmission: 'Automatique',
    seats: 5,
    luggage: 3,
    airConditioning: true,
    mileage: 'Illimité',
    maxSpeed: 250,
    trunkSize: 480
  }
];


export function MaqdisCarWebsite() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedFilters, setSelectedFilters] = useState({ 
    type: '', 
    priceRange: ''
  })
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [showReservationConfirmation, setShowReservationConfirmation] = useState(false)

  // Get unique car types
  const carTypes = Array.from(new Set(cars.map(car => car.type)))

  const filteredCars = cars.filter(car => {
    const matchesType = selectedFilters.type === '' || car.type === selectedFilters.type;
    let matchesPrice = true;
    
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split('-').map(Number);
      matchesPrice = car.price >= min && car.price <= max;
    }

    return matchesType && matchesPrice;
  })

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const closeCarDetails = () => {
    setSelectedCar(null)
  }

  const closeReservationConfirmation = () => {
    setShowReservationConfirmation(false)
  }

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('+212 661-100660')
    toast.success('Numéro de téléphone copié!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className={`min-h-screen ${currentPage === 'about' ? 'bg-white' : ''}`}>
      <div 
        className={`transition-all duration-300 bg-gray-800 relative z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1">
            {/* Logo - adjusted size for smaller height */}
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src="/lilogo.png" 
                  alt="liligo Logo" 
                  width={150} 
                  height={80} 
                  className="mr-2 md:w-[200px] w-[150px]" 
                />
              </motion.div>
            </div>
            
            {/* Navigation buttons - adjusted for smaller height */}
            <div className="space-x-2 md:space-x-4">
              <button
                className={`text-sm md:text-base transition-all duration-300 px-3 py-1 text-white ${
                  currentPage === 'home' 
                    ? 'font-bold' 
                    : 'opacity-80 hover:opacity-100'
                }`}
                onClick={() => setCurrentPage('home')}
              >
                Accueil
              </button>
              <button
                className={`text-sm md:text-base transition-all duration-300 px-3 py-1 text-white ${
                  currentPage === 'about' 
                    ? 'font-bold' 
                    : 'opacity-80 hover:opacity-100'
                }`}
                onClick={() => setCurrentPage('about')}
              >
                À Propos
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className="relative min-h-screen">
              {/* Background with parallax effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/luxury-cars.jpg')] bg-cover bg-center bg-fixed" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-800/90 to-gray-800/80" />
              </div>

              {/* Content */}
              <div className="relative min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-white space-y-8"
                    >
                      <div className="inline-block">
                        <h1 className="text-2xl font-light mb-2">Location de Voitures</h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-[#A3C528] to-[#A3C528]/70" />
                      </div>
                      
                      <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                        <span className="block">Découvrez Notre</span>
                        <span className="block mt-2">
                          Collection <span className="text-gray-300 italic">Premium</span>
                        </span>
                      </h2>

                      <p className="text-gray-300 text-lg max-w-xl">
                        Explorez le Maroc avec style et confort. Notre flotte de véhicules soigneusement sélectionnés vous attend pour une expérience de conduite exceptionnelle.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          className="bg-[#A3C528] hover:bg-[#8BA821] text-white px-8 py-4 rounded-none text-lg font-semibold 
                                   transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
                          onClick={() => {
                            const catalogElement = document.getElementById('catalog');
                            if (catalogElement) {
                              catalogElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Voir le Catalogue
                        </Button>
                        <Button
                          className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-none text-lg 
                                   transform transition-all duration-300 hover:translate-y-[-2px]"
                          onClick={() => window.open('https://wa.me/212661100660', '_blank')}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Nous Contacter
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#A3C528]/20">
                        <div>
                          <p className="text-3xl font-bold text-[#A3C528]">25+</p>
                          <p className="text-gray-400">Véhicules</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">15K+</p>
                          <p className="text-gray-400">Clients Satisfaits</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">24/7</p>
                          <p className="text-gray-400">Support Client</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column - Featured Car Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="hidden lg:block"
                    >
                      <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-gray-500/20 to-transparent rounded-full blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-gray-500/20 to-transparent rounded-full blur-2xl" />
                        
                        {/* Featured car card */}
                        <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                          <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-6">
                            <Image
                              src="/featured-car.jpeg"
                              alt="Featured Car"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-white">Mercedes Classe C</h3>
                                <p className="text-gray-400">Luxury Edition</p>
                              </div>
                              <Badge className="bg-white/10 text-white border-0">
                                Premium
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center text-gray-300">
                                <Settings className="w-4 h-4 mr-2" />
                                <span>Automatique</span>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Users className="w-4 h-4 mr-2" />
                                <span>5 Places</span>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-400">À partir de</p>
                                <p className="text-2xl font-bold text-white">500 MAD<span className="text-sm font-normal">/jour</span></p>
                              </div>
                              <Button
                                className="bg-white text-gray-900 hover:bg-gray-100 rounded-full w-12 h-12 p-0 flex items-center justify-center"
                                onClick={() => {
                                  const catalogElement = document.getElementById('catalog');
                                  if (catalogElement) {
                                    catalogElement.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                              >
                                <ChevronRight className="w-6 h-6" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <section id="catalog" className="py-16 px-4 md:px-8 bg-gray-100">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Notre Catalogue</h2>
              
              <div className="mb-16 max-w-6xl mx-auto">
                <div className="relative">
                  {/* Glass morphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/50 backdrop-blur-lg rounded-3xl shadow-2xl" />
                  
                  {/* Main content */}
                  <div className="relative p-8">
                    {/* Header with animated underline */}
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 inline-block relative">
                        Filtrer les véhicules
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#A3C528] via-[#A3C528] to-[#A3C528]/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </h3>
                    </div>

                    {/* Filter cards container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Type filter card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <Settings className="w-5 h-5 text-gray-500 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-700">Type de véhicule</h4>
                        </div>
                        <div className="space-y-2">
                          <select
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4
                                     text-gray-700 appearance-none cursor-pointer
                                     focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200
                                     transition-all duration-300"
                            value={selectedFilters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                          >
                            <option value="">Tous les véhicules</option>
                            {carTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {selectedFilters.type && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-gray-500 mt-2"
                            >
                              Filtré par: {selectedFilters.type}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      {/* Price filter card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <Badge className="w-5 h-5 text-gray-500 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-700">Prix par jour</h4>
                        </div>
                        <div className="space-y-2">
                          <select
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4
                                     text-gray-700 appearance-none cursor-pointer
                                     focus:outline-none focus:border-[#A3C528] focus:ring-2 focus:ring-[#A3C528]/20
                                     transition-all duration-300"
                            value={selectedFilters.priceRange}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          >
                            <option value="">Tous les prix</option>
                            <option value="0-300">Moins de 300 MAD</option>
                            <option value="300-500">300 - 500 MAD</option>
                            <option value="500-1000">Plus de 500 MAD</option>
                          </select>
                          {selectedFilters.priceRange && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-sm text-gray-500 mt-2"
                            >
                              Prix sélectionné: {
                                selectedFilters.priceRange === '0-300' ? 'Moins de 300 MAD' :
                                selectedFilters.priceRange === '300-500' ? '300 - 500 MAD' :
                                'Plus de 500 MAD'
                              }
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Results summary */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-8 text-center"
                    >
                      <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                        <span className="text-gray-600 font-medium">
                          {filteredCars.length} véhicule{filteredCars.length !== 1 ? 's' : ''} disponible{filteredCars.length !== 1 ? 's' : ''}
                        </span>
                        {(selectedFilters.type || selectedFilters.priceRange) && (
                          <button
                            onClick={() => setSelectedFilters({ type: '', priceRange: '' })}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCars.map((car) => (
                  <motion.div
                    key={car.id}
                    className="relative bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Car Image */}
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-6">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover transform transition-transform duration-500 hover:scale-110"
                      />
                      {car.featured && (
                        <div className="absolute top-4 right-4 bg-white/10 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                          Premium
                        </div>
                      )}
                    </div>

                    {/* Car Details */}
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white">{car.name}</h3>
                          <p className="text-gray-400">{car.version}</p>
                        </div>
                        <Badge className="bg-[#A3C528]/10 text-[#A3C528] border border-[#A3C528]/20">
                          {car.type}
                        </Badge>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-300">
                          <Settings className="w-4 h-4 mr-2" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{car.seats} Places</span>
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">À partir de</p>
                          <p className="text-2xl font-bold text-white">{car.price.toLocaleString()} MAD<span className="text-sm font-normal">/jour</span></p>
                        </div>
                        <Button
                          className="bg-[#A3C528] hover:bg-[#8BA821] text-white rounded-full w-12 h-12 p-0 flex items-center justify-center"
                          onClick={() => window.open(`https://wa.me/212661100660?text=Bonjour, je suis intéressé par la location de ${car.name} (${car.version}) à ${car.price} MAD/jour.`, '_blank')}
                        >
                          <MessageCircle className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Add new map section */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Notre Emplacement</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#A3C528]/60 via-[#A3C528] to-[#A3C528]/60 mx-auto" />
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Idéalement situé pour votre confort, notre agence vous accueille dans un cadre professionnel et chaleureux
                  </p>
                </div>

                {/* Main Content Container */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Map Container */}
                    <div className="relative h-[400px] lg:h-full min-h-[400px] order-2 lg:order-1">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.22464227453!2d-6.594714367991168!3d34.265285632412116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7591df16fe441%3A0x35a8a9e5e65dd776!2sLiligo%20car!5e0!3m2!1sfr!2sma!4v1732372362554!5m2!1sfr!2sma" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="p-8 lg:p-12 order-1 lg:order-2 bg-gradient-to-br from-gray-50 to-white">
                      <div className="max-w-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                          Visitez Notre Agence
                        </h3>
                        
                        {/* Contact Cards */}
                        <div className="space-y-6">
                          {/* Address Card */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="bg-gray-100 rounded-full p-3">
                                <MapPin className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Adresse</h4>
                                <p className="text-gray-600">
                                  Angle abou bakr Essidik et rue Ghandi N°30 - 32 immeuble B résidence Ibrahim - Bureau, Rue N°4, Kénitra 14020
                                </p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Phone Card */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="bg-gray-100 rounded-full p-3">
                                <Phone className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Téléphone</h4>
                                <p className="text-gray-600">+212 661-100660</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Hours Card */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="bg-gray-100 rounded-full p-3">
                                <Clock className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">Heures d&apos;ouverture</h4>
                                <p className="text-gray-600">Lun - Sam: 9h00 - 18h00</p>
                                <p className="text-gray-600">Dimanche: Fermé</p>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Call-to-action Button */}
                        <div className="mt-8">
                          <Button 
                            className="w-full bg-[#A3C528] hover:bg-[#8BA821] text-white px-8 py-4 rounded-xl"
                            onClick={() => window.open('https://wa.me/212661100660', '_blank')}
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Nous Contacter sur WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white"
          >
            {/* Timeline Section - Start directly with the content */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-6xl mx-auto px-4">
                {/* Notre Mission */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
                  <p className="text-gray-600 text-lg">
                    Chez <span className="text-[#A3C528] font-semibold">LILIGO CAR</span>, notre mission est de vous offrir...
                  </p>
                </div>

                {/* Notre Vision */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Vision</h2>
                  <p className="text-gray-600 text-lg">
                    Nous aspirons à devenir la référence incontournable de la location de voitures au Maroc, en proposant une
                    flotte moderne et écologique, tout en mettant l&apos;accent sur l&apos;innovation, la durabilité et la satisfaction de nos
                    clients. <span className="text-[#A3C528] font-semibold">LILIGO CAR</span> s&apos;engage à être votre partenaire de confiance pour tous vos voyages.
                  </p>
                </div>

                {/* Pourquoi nous choisir */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Pourquoi choisir LILIGO CAR ?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Une flotte diversifiée de véhicules récents et bien entretenus",
                        icon: <Car className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Des options de location flexibles adaptées à vos besoins",
                        icon: <Settings className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Un service client disponible 24/7 pour vous assister",
                        icon: <Clock className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Des tarifs transparents et compétitifs",
                        icon: <Wallet className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Une présence dans les principales villes touristiques du Maroc",
                        icon: <MapPin className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Siège bébé gratuit pour votre sécurité et confort",
                        icon: <Baby className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Service d'assistance et remorquage disponible",
                        icon: <Wrench className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Assurance Tous risques incluse pour votre tranquillité",
                        icon: <Shield className="w-6 h-6 text-[#A3C528]" />
                      },
                      {
                        title: "Des conseils personnalisés pour optimiser votre voyage",
                        icon: <MessageCircle className="w-6 h-6 text-[#A3C528]" />
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="bg-gray-50 rounded-full p-3">
                          {item.icon}
                        </div>
                        <p className="text-gray-700 font-medium">{item.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="py-20 bg-gray-900 text-white">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold mb-4">Nos Valeurs</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#A3C528]/60 via-[#A3C528] to-[#A3C528]/60 mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#A3C528]/5 rounded-xl p-8 text-center hover:bg-[#A3C528]/10 transition-colors duration-300"
                  >
                    <div className="bg-[#A3C528]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-8 h-8 text-[#A3C528]" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Fiabilité</h3>
                    <p className="text-gray-300">Des véhicules rigoureusement entretenus pour votre sécurité</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#A3C528]/5 rounded-xl p-8 text-center hover:bg-[#A3C528]/10 transition-colors duration-300"
                  >
                    <div className="bg-[#A3C528]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-8 h-8 text-[#A3C528]" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Service Client</h3>
                    <p className="text-gray-300">Une équipe dévouée à votre satisfaction</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#A3C528]/5 rounded-xl p-8 text-center hover:bg-[#A3C528]/10 transition-colors duration-300"
                  >
                    <div className="bg-[#A3C528]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-8 h-8 text-[#A3C528]" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Innovation</h3>
                    <p className="text-gray-300">Des solutions modernes pour une expérience optimale</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-white mb-6">Prêt à Commencer?</h2>
                  <p className="text-gray-300 mb-8">
                    Découvrez notre sélection de véhicules et profitez d&apos;une expérience de location unique
                  </p>
                  <Button 
                    className="bg-[#A3C528] hover:bg-[#8BA821] text-white px-8 py-4 rounded-full text-lg font-semibold"
                    onClick={() => {
                      setCurrentPage('home');
                      setTimeout(() => {
                        const catalogElement = document.getElementById('catalog');
                        if (catalogElement) {
                          catalogElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Voir nos Véhicules
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              <span className="bg-gradient-to-r from-[#A3C528] via-[#A3C528] to-[#A3C528] text-transparent bg-clip-text">
                LILIGO CAR
              </span>
            </h3>
            <p className="text-sm">Votre partenaire de confiance pour explorer le Maroc</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 LILIGO CAR. Tous droits réservés.</p>
        </div>
      </footer>

      <Dialog open={!!selectedCar} onOpenChange={closeCarDetails}>
        <DialogContent className="bg-gray-900 text-white max-w-4xl">
          <div className="relative w-full">
            {/* Single close button */}
            <button
              onClick={closeCarDetails}
              className="absolute right-0 top-0 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Rest of the dialog content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ... existing content ... */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReservationConfirmation} onOpenChange={closeReservationConfirmation}>
        <DialogContent className="bg-white text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Confirmation de réservation</DialogTitle>
            <DialogDescription>
              <p className="mt-4 text-gray-600">
                Merci d&apos;avoir choisi <span className="font-bold italic text-[#A3C528]">LILIGO CAR</span> pour votre location de voiture.
              </p>
              <p className="mt-2 text-gray-600">
                Pour finaliser votre réservation, veuillez nous contacter par l&apos;un des moyens suivants :
              </p>
              <div className="mt-6 space-y-4">
                <Button 
                  className="w-full bg-[#A3C528] hover:bg-[#8BA821] text-white" 
                  onClick={() => window.open('https://wa.me/212661100660', '_blank')}
                >
                  <MessageCircle className="mr-2" />
                  Contacter sur WhatsApp
                </Button>
                <div className="flex items-center space-x-2">
                  <Button className="flex-grow bg-gray-600 hover:bg-gray-700 text-white">
                    <Phone className="mr-2" />
                    +212 661-100660
                  </Button>
                  <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800" onClick={copyPhoneNumber}>
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
 
      <ToastContainer />
    </div>
  )
}
