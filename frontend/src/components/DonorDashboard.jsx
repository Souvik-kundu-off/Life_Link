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
  Navigation
} from 'lucide-react'

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome, John Doe</h1>
                <p className="text-sm text-gray-500">Blood Donor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <p className="text-xs text-muted-foreground">Last donation: 45 days ago</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lives Saved</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">36</div>
                  <p className="text-xs text-muted-foreground">Each donation saves 3 lives</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">23 days</div>
                  <p className="text-xs text-muted-foreground">Available to donate again</p>
                </CardContent>
              </Card>
            </div>

            {/* Donor Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Profile</CardTitle>
                <CardDescription>Your current donor information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">Age: 28 years</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Blood Type: O+</p>
                        <p className="text-sm text-gray-500">Universal donor</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Downtown Area</p>
                        <p className="text-sm text-gray-500">New York, NY</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Status: Available</p>
                        <p className="text-sm text-gray-500">Ready to donate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Blood Requests</CardTitle>
                <CardDescription>Urgent requests in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">City General Hospital</h4>
                          <p className="text-sm text-gray-500">Urgent: O+ blood needed</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          2.3 km away
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                        <Button size="sm">Respond</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Your complete blood donation record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Donation #{2024000 + i + 1}</h4>
                          <p className="text-sm text-gray-500">Metro Blood Center • 450ml</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">March {15 + i}, 2024</p>
                          <p className="text-xs text-gray-500">Completed successfully</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">St. Mary's Medical Center</h4>
                          <p className="text-sm text-gray-500">Emergency surgery patient needs O+ blood</p>
                          <div className="flex items-center mt-1 text-xs text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            Posted 2 hours ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">O+</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          4.7 km
                        </div>
                        <Badge variant="destructive">Urgent</Badge>
                        <Button size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your donor profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input value="John Doe" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input value="john.doe@email.com" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input value="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Blood Type</label>
                      <Input value="O+" readOnly />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      <Input value="January 15, 1996" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input value="123 Main Street, Downtown" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                      <Input value="Jane Doe - (555) 987-6543" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notifications" defaultChecked />
                      <label htmlFor="notifications" className="text-sm">
                        Receive notification for urgent requests
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}