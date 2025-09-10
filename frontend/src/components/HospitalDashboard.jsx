import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import {
  Heart,
  Users,
  Activity,
  AlertTriangle,
  Search,
  Plus,
  Building2,
  Bell,
  Settings,
  LogOut,
  Filter,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
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
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">City General Hospital</h1>
                <p className="text-sm text-gray-500">Blood Bank Management</p>
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
            <TabsTrigger value="overview" onClick={() => setActiveTab('overview')}>Overview</TabsTrigger>
            <TabsTrigger value="donors" onClick={() => setActiveTab('donors')}>Donors</TabsTrigger>
            <TabsTrigger value="recipients" onClick={() => setActiveTab('recipients')}>Recipients</TabsTrigger>
            <TabsTrigger value="requests" onClick={() => setActiveTab('requests')}>Blood Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">5 critical, 8 urgent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Units</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,456</div>
                  <p className="text-xs text-muted-foreground">Available in stock</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Matches</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">Successful matches</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Latest blood donations received</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Heart className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">John Doe #{1000 + i}</p>
                            <p className="text-xs text-gray-500">O+ • 450ml</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">2 hours ago</p>
                          <Badge variant="outline" className="text-xs">Processed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Urgent Requests</CardTitle>
                  <CardDescription>Blood requests requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-sm font-medium">Emergency Room</p>
                            <p className="text-xs text-gray-500">AB- • 2 units needed</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                          <p className="text-xs text-gray-500 mt-1">30 min ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donor Management</CardTitle>
                    <CardDescription>Manage registered blood donors</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Donor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search donors..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <p className="text-sm text-gray-500">sarah.j@email.com • (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">A+</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          2.3 km
                        </div>
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                        <Button variant="outline" size="sm">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recipient Management</CardTitle>
                    <CardDescription>Manage blood recipients and patients</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Recipient
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Patient #2024-{String(i + 1).padStart(3, '0')}</h4>
                          <p className="text-sm text-gray-500">Emergency Room • Dr. Smith</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">O-</Badge>
                        <div className="text-sm text-gray-500">2 units needed</div>
                        <Badge variant="destructive">Critical</Badge>
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

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Request Management</CardTitle>
                <CardDescription>Active and pending blood donation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Request #{2024}{String(i + 1).padStart(4, '0')}</h4>
                          <p className="text-sm text-gray-500">Submitted 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">B+</Badge>
                        <div className="text-sm text-gray-500">3 units</div>
                        <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}