import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Heart, Building2, Shield, Users, Droplets, MapPin, Star, Mail, Phone, Award } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <Heart className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">LifeLink</h1>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-pink-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-pink-100/30"></div>

        {/* Floating Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-20 left-10 text-red-300"
        >
          <Heart className="h-16 w-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-32 right-16 text-blue-300"
        >
          <Droplets className="h-12 w-12" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-32 left-20 text-green-300"
        >
          <Users className="h-14 w-14" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-20 right-10 text-purple-300"
        >
          <Award className="h-10 w-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Save Lives Through
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-red-600 block"
            >
              Blood Donation
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Connect donors, recipients, and hospitals in a seamless network that makes blood donation
            more efficient and accessible. Every donation can save up to three lives.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Registration</h3>
              <p className="text-gray-600 text-center">Quick and simple donor registration process</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Centers</h3>
              <p className="text-gray-600 text-center">Locate nearby donation centers instantly</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Safe</h3>
              <p className="text-gray-600 text-center">Verified hospitals and secure data handling</p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button size="lg" className="bg-red-600 hover:bg-red-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 px-8 py-4 text-lg" onClick={() => navigate('/ireg')}>
              <Heart className="mr-3 h-6 w-6" />
              Start Donating Today
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 transition-all px-8 py-4 text-lg" onClick={() => navigate('/')}>
              <Users className="mr-3 h-6 w-6" />
              Join Our Community
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Verified & Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Trusted by 500+ Hospitals</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              <span>10,000+ Active Donors</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600">Choose your role and start making a difference today</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-red-300 hover:-translate-y-2 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Individual Donor</CardTitle>
                  <CardDescription>
                    Donate blood and help save lives in your community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Droplets className="h-4 w-4 text-red-500 mr-2" />
                      Register as blood donor
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-500 mr-2" />
                      Find nearby donation centers
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-red-500 mr-2" />
                      Track donation history
                    </li>
                  </ul>
                  <Button className="w-full bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all" onClick={() => navigate('/ireg')}>
                    Join as Donor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 hover:-translate-y-2 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Hospital Staff</CardTitle>
                  <CardDescription>
                    Manage blood requests and donor coordination
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 text-blue-500 mr-2" />
                      Manage blood inventory
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      Coordinate with donors
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                      Track requests & matches
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all" onClick={() => navigate('/hreg')}>
                    Hospital Access
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 hover:-translate-y-2 group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Administrator</CardTitle>
                  <CardDescription>
                    System oversight and platform management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      System administration
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-green-500 mr-2" />
                      User verification
                    </li>
                    <li className="flex items-center">
                      <Building2 className="h-4 w-4 text-green-500 mr-2" />
                      Platform oversight
                    </li>
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all" onClick={() => navigate('/alogin')}>
                    Admin Panel
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600">Real stories from donors and hospitals using LifeLink</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "LifeLink made it so easy to find donation centers near me. I've donated 5 times this year and it's all thanks to this platform!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Priya Sharma</p>
                      <p className="text-sm text-gray-500">Regular Donor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "As a hospital administrator, LifeLink has streamlined our blood inventory management. We can now respond to emergencies much faster."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-gray-500">Hospital Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The platform's matching system helped us find compatible donors quickly during a critical situation. Truly life-saving technology."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Anjali Patel</p>
                      <p className="text-sm text-gray-500">Medical Coordinator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-red-100 text-lg">Making a difference, one donation at a time</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
              >
                10K+
              </motion.div>
              <div className="text-red-100">Registered Donors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
              >
                500+
              </motion.div>
              <div className="text-red-100">Partner Hospitals</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
              >
                25K+
              </motion.div>
              <div className="text-red-100">Lives Saved</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
              >
                50+
              </motion.div>
              <div className="text-red-100">Cities Covered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest updates on blood donation drives, emergency alerts, and platform features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
              />
              <Button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">LifeLink</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting lives through blood donation. Making healthcare accessible for everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Award className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/ireg" className="hover:text-white transition-colors">For Donors</a></li>
                <li><a href="/hreg" className="hover:text-white transition-colors">For Hospitals</a></li>
                <li><a href="/alogin" className="hover:text-white transition-colors">For Admin</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400 mb-2">24/7 Blood Emergency Hotline</p>
              <p className="text-xl font-bold text-red-500 mb-4">1-800-BLOOD-NOW</p>
              <p className="text-sm text-gray-400">
                Available 24/7 for urgent blood requests and emergency coordination.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 LifeLink. All rights reserved. | Made with ❤️ for saving lives</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}