import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import {
  Heart,
  User,
  Calendar,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Clock,
  Activity,
  Award,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Navigation,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterUrgent, setFilterUrgent] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const notifications = [
    { id: 1, message: 'Urgent O+ blood request at City Hospital', time: '2 hours ago', urgent: true },
    { id: 2, message: 'Donation reminder: You\'re eligible again', time: '1 day ago', urgent: false },
    { id: 3, message: 'Thank you for your recent donation!', time: '3 days ago', urgent: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg border-b border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Welcome, John Doe</h1>
                <p className="text-sm text-red-100">Blood Donor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('dashboard')}
                  className={`text-white hover:bg-white hover:bg-opacity-20 ${
                    activeTab === 'dashboard' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === 'donations' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('donations')}
                  className={`text-white hover:bg-white hover:bg-opacity-20 ${
                    activeTab === 'donations' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  My Donations
                </Button>
                <Button
                  variant={activeTab === 'requests' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('requests')}
                  className={`text-white hover:bg-white hover:bg-opacity-20 ${
                    activeTab === 'requests' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Blood Requests
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('profile')}
                  className={`text-white hover:bg-white hover:bg-opacity-20 ${
                    activeTab === 'profile' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-20 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => n.urgent).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {notifications.filter(n => n.urgent).length}
                    </span>
                  )}
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            {notification.urgent && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-20">
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>Dashboard</TabsTrigger>
            <TabsTrigger value="donations" onClick={() => setActiveTab('donations')}>My Donations</TabsTrigger>
            <TabsTrigger value="requests" onClick={() => setActiveTab('requests')}>Blood Requests</TabsTrigger>
            <TabsTrigger value="profile" onClick={() => setActiveTab('profile')}>Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-red-800">Total Donations</CardTitle>
                  <div className="bg-red-500 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-1">12</div>
                  <p className="text-xs text-red-600">Last donation: 45 days ago</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-green-800">Lives Saved</CardTitle>
                  <div className="bg-green-500 p-2 rounded-full">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-1">36</div>
                  <p className="text-xs text-green-600">Each donation saves 3 lives</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-800">Next Eligible</CardTitle>
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-1">23 days</div>
                  <p className="text-xs text-blue-600">Available to donate again</p>
                </CardContent>
              </Card>
            </div>

            {/* Donor Profile Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Donor Profile</CardTitle>
                <CardDescription className="text-blue-100">Your current donor information</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-600">Age: 28 years</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <div className="bg-red-500 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Blood Type: O+</p>
                        <p className="text-sm text-gray-600">Universal donor</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <div className="bg-green-500 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Downtown Area</p>
                        <p className="text-sm text-gray-600">New York, NY</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <div className="bg-green-500 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Status: Available</p>
                        <p className="text-sm text-gray-600">Ready to donate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Requests */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Nearby Blood Requests</CardTitle>
                <CardDescription className="text-orange-100">Urgent requests in your area</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-sm">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">City General Hospital</h4>
                          <p className="text-sm text-gray-600">Urgent: O+ blood needed</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          2.3 km away
                        </div>
                        <Badge variant="destructive" className="shadow-sm">Critical</Badge>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 shadow-sm">Respond</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            {/* Donation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-800">This Year</CardTitle>
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                  <p className="text-xs text-blue-600">Donations completed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-green-800">Total Volume</CardTitle>
                  <div className="bg-green-500 p-2 rounded-full">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-1">3.6L</div>
                  <p className="text-xs text-green-600">Blood donated</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-800">Lives Saved</CardTitle>
                  <div className="bg-purple-500 p-2 rounded-full">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 mb-1">24</div>
                  <p className="text-xs text-purple-600">This year alone</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-orange-800">Next Due</CardTitle>
                  <div className="bg-orange-500 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600 mb-1">23 days</div>
                  <p className="text-xs text-orange-600">Until next donation</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Donation History</CardTitle>
                <CardDescription className="text-indigo-100">Your complete blood donation record</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Donation #{2024000 + i + 1}</h4>
                          <p className="text-sm text-gray-600">Metro Blood Center • 450ml</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            Downtown Center
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">March {15 + i}, 2024</p>
                          <p className="text-xs text-gray-600">Completed successfully</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-sm">Complete</Badge>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Available Blood Requests</CardTitle>
                    <CardDescription>Find and respond to blood donation requests</CardDescription>
                  </div>
                  <Button>
                    <Navigation className="h-4 w-4 mr-2" />
                    Find Nearby
                  </Button>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Input
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    size="sm"
                  />
                  <Button
                    variant={filterUrgent ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => setFilterUrgent(!filterUrgent)}
                    title="Toggle Urgent Only"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span className="sr-only">Toggle Urgent Only</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 6 })
                    .filter((_, i) => {
                      // Simulate filtering by search and urgent flag
                      const request = {
                        id: i,
                        hospital: i % 2 === 0 ? "St. Mary's Medical Center" : "City Hospital",
                        urgent: i % 3 === 0,
                        bloodType: i % 2 === 0 ? 'O+' : 'A-',
                        distance: 4.7 - i * 0.5,
                        description: 'Emergency surgery patient needs O+ blood',
                        posted: '2 hours ago',
                      }
                      const matchesSearch = request.hospital.toLowerCase().includes(searchQuery.toLowerCase())
                      const matchesUrgent = filterUrgent ? request.urgent : true
                      return matchesSearch && matchesUrgent
                    })
                    .map((_, i) => {
                      const request = {
                        id: i,
                        hospital: i % 2 === 0 ? "St. Mary's Medical Center" : "City Hospital",
                        urgent: i % 3 === 0,
                        bloodType: i % 2 === 0 ? 'O+' : 'A-',
                        distance: 4.7 - i * 0.5,
                        description: 'Emergency surgery patient needs O+ blood',
                        posted: '2 hours ago',
                      }
                      return (
                        <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-sm">
                              <AlertCircle className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{request.hospital}</h4>
                              <p className="text-sm text-gray-600">{request.description}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-400 space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Posted {request.posted}</span>
                                <MapPin className="h-4 w-4" />
                                <span>{request.distance.toFixed(1)} km away</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <Badge variant="outline" className="text-sm px-3 py-1">{request.bloodType}</Badge>
                            {request.urgent && <Badge variant="destructive" className="text-sm px-3 py-1">Urgent</Badge>}
                            <Button size="sm" className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 shadow-sm">
                              <Phone className="h-4 w-4" />
                              <span>Contact</span>
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">John Doe</CardTitle>
                    <CardDescription className="text-purple-100">Blood Donor • O+ Type • Universal Donor</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Total Donations</div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">36</div>
                    <div className="text-sm text-gray-600">Lives Saved</div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4.8★</div>
                    <div className="text-sm text-gray-600">Donor Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-blue-100">Manage your donor profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <Input value="John Doe" readOnly className="border-0 bg-transparent focus:ring-0" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <Input value="john.doe@email.com" readOnly className="border-0 bg-transparent focus:ring-0" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <Input value="+1 (555) 123-4567" className="border-0 bg-transparent focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                      <div className="flex items-center space-x-2">
                        <Input value="O+" readOnly className="border-0 bg-transparent focus:ring-0" />
                        <Badge className="bg-red-100 text-red-800">Universal Donor</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <Input value="January 15, 1996" readOnly className="border-0 bg-transparent focus:ring-0" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <Input value="123 Main Street, Downtown" className="border-0 bg-transparent focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                      <Input value="Jane Doe - (555) 987-6543" className="border-0 bg-transparent focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Notifications</label>
                          <p className="text-xs text-gray-600">Receive urgent blood request alerts</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="notifications" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                          <label htmlFor="notifications" className="text-sm text-gray-700">Enabled</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button variant="outline" className="hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Donor Achievements */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Donor Achievements</CardTitle>
                <CardDescription className="text-green-100">Your milestones and recognition</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                    <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-800">Regular Donor</div>
                    <div className="text-sm text-gray-600">5+ donations</div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                    <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-800">Life Saver</div>
                    <div className="text-sm text-gray-600">30+ lives saved</div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                    <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-800">Universal Hero</div>
                    <div className="text-sm text-gray-600">O+ blood type</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}