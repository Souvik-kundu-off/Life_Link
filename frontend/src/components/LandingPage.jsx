import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Heart, Building2, Shield, Users, Droplets, MapPin } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">LifeFlow</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-red-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-red-600">About</a>
              <a href="#" className="text-gray-600 hover:text-red-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Save Lives Through
            <span className="text-red-600 block">Blood Donation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect donors, recipients, and hospitals in a seamless network that makes blood donation 
            more efficient and accessible. Every donation can save up to three lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => navigate('/ireg')}>
              <Heart className="mr-2 h-5 w-5" />
              Start Donating
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/')}>
              Learn More
            </Button>
          </div>
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
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-red-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
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
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => navigate('/ireg')}>
                  Join as Donor
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/hreg')}>
                  Hospital Access
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => navigate('/alogin')}>
                  Admin Panel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-red-100">Registered Donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-red-100">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-red-100">Lives Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-red-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">LifeFlow</span>
              </div>
              <p className="text-gray-400">
                Connecting lives through blood donation. Making healthcare accessible for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/ireg" className="hover:text-white">For Donors</a></li>
                <li><a href="/hreg" className="hover:text-white">For Hospitals</a></li>
                <li><a href="/alogin" className="hover:text-white">For Admin</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400 mb-2">24/7 Blood Emergency Hotline</p>
              <p className="text-xl font-bold text-red-500">1-800-BLOOD-NOW</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LifeFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}