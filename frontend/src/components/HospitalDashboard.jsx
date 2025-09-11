import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { StatCard } from './ui/stat-card'
import { DataList } from './ui/data-list'
import { ProgressBar } from './ui/progress-bar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import AddDonorForm from './AddDonorForm'
import AddRecipientForm from './AddRecipientForm'
import AddBloodRequestForm from './AddBloodRequestForm'
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
  XCircle,
  Droplet,
  TrendingUp,
  TrendingDown,
  Home,
  UserPlus,
  UserCheck,
  ClipboardList
} from 'lucide-react'

export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  // Modal states
  const [showAddDonorModal, setShowAddDonorModal] = useState(false)
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false)
  const [showAddRequestModal, setShowAddRequestModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  // Form submission handlers
  const handleAddDonor = async (donorData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/hospital/adddoner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(donorData)
      })

      if (response.ok) {
        alert('Donor added successfully!')
        // Here you could refresh the donor list or update state
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error adding donor:', error)
      alert('Failed to add donor. Please try again.')
    }
  }

  const handleAddRecipient = async (recipientData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/hospital/addreciever', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(recipientData)
      })

      if (response.ok) {
        alert('Recipient added successfully!')
        // Here you could refresh the recipient list or update state
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error adding recipient:', error)
      alert('Failed to add recipient. Please try again.')
    }
  }

  const handleAddBloodRequest = async (requestData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/hospital/addreciever', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        alert('Blood request submitted successfully!')
        // Here you could refresh the request list or update state
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Failed to submit request. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-white drop-shadow-lg" />
              <div>
                <h1 className="text-xl font-semibold text-white drop-shadow-lg">City General Hospital</h1>
                <p className="text-sm text-blue-100 drop-shadow-md">Blood Bank Management</p>
              </div>
            </div>

            {/* Tab Navigation in Navbar */}
            <div className="hidden md:flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20">
              <button
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                    : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <Home className="h-4 w-4" />
                <span>Overview</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'donors'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg transform scale-105'
                    : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
                }`}
                onClick={() => setActiveTab('donors')}
              >
                <UserPlus className="h-4 w-4" />
                <span>Donors</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'recipients'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
                }`}
                onClick={() => setActiveTab('recipients')}
              >
                <UserCheck className="h-4 w-4" />
                <span>Recipients</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'requests'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                    : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
                }`}
                onClick={() => setActiveTab('requests')}
              >
                <ClipboardList className="h-4 w-4" />
                <span>Blood Requests</span>
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="ml-4 text-white hover:bg-white/20 hover:text-yellow-300 transition-all duration-200">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-purple-300 transition-all duration-200">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20 hover:text-red-300 transition-all duration-200" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} className="space-y-6">

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Donors"
                value="2,847"
                description="Active registered donors"
                trend="up"
                trendValue="12%"
                icon={Users}
              />

              <StatCard
                title="Active Requests"
                value="23"
                description="5 critical, 8 urgent"
                icon={Heart}
              />

              <StatCard
                title="Blood Units"
                value="1,456"
                description="Available in stock"
                trend="up"
                trendValue="8%"
                icon={Droplet}
              />

              <StatCard
                title="Today's Matches"
                value="18"
                description="Successful matches"
                trend="up"
                trendValue="15%"
                icon={CheckCircle}
              />
            </div>

            {/* Blood Type Inventory */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-red-500" />
                  Blood Type Inventory
                </CardTitle>
                <CardDescription>Current stock levels by blood type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { type: 'A+', current: 85, max: 100, color: 'red' },
                    { type: 'B+', current: 62, max: 100, color: 'blue' },
                    { type: 'AB+', current: 23, max: 50, color: 'green' },
                    { type: 'O+', current: 94, max: 100, color: 'purple' },
                    { type: 'A-', current: 45, max: 80, color: 'red' },
                    { type: 'B-', current: 18, max: 60, color: 'blue' },
                    { type: 'AB-', current: 8, max: 30, color: 'green' },
                    { type: 'O-', current: 76, max: 90, color: 'purple' }
                  ].map((bloodType) => (
                    <div key={bloodType.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{bloodType.type}</span>
                        <span className="text-xs text-gray-500">{bloodType.current}/{bloodType.max}</span>
                      </div>
                      <ProgressBar
                        value={bloodType.current}
                        max={bloodType.max}
                        color={bloodType.color}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
            <DataList
              title="Donor Management"
              description="Manage registered blood donors"
              items={Array.from({ length: 8 }).map((_, i) => ({
                id: i,
                name: `Sarah Johnson ${i + 1}`,
                email: `sarah.j${i + 1}@email.com`,
                phone: `(555) ${123 + i}-4567`,
                bloodType: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'][i % 8],
                distance: `${(2.3 + i * 0.5).toFixed(1)} km`,
                status: i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Recent Donor' : 'Unavailable'
              }))}
              searchPlaceholder="Search donors by name, email, or blood type..."
              onSearch={(query) => {
                // Implement search filter logic here
                console.log('Search donors:', query)
              }}
              onFilter={() => {
                // Implement filter logic here
                console.log('Filter donors clicked')
              }}
              onAdd={() => {
                setShowAddDonorModal(true)
              }}
              addButtonText="Add Donor"
              renderItem={(donor) => (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{donor.name}</h4>
                      <p className="text-sm text-gray-500">{donor.email} • {donor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{donor.bloodType}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {donor.distance}
                    </div>
                    <Badge className={`${
                      donor.status === 'Available' ? 'bg-green-100 text-green-800' :
                      donor.status === 'Recent Donor' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {donor.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </>
              )}
            />
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <DataList
              title="Recipient Management"
              description="Manage blood recipients and patients"
              items={Array.from({ length: 6 }).map((_, i) => ({
                id: i,
                patientId: `2024-${String(i + 1).padStart(3, '0')}`,
                department: ['Emergency Room', 'ICU', 'Surgery', 'Cardiology', 'Oncology', 'Pediatrics'][i % 6],
                doctor: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis', 'Dr. Miller'][i % 6],
                bloodType: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-'][i % 6],
                unitsNeeded: 2 + (i % 3),
                urgency: i % 3 === 0 ? 'Critical' : i % 3 === 1 ? 'Urgent' : 'Normal',
                timeAgo: `${30 + i * 15} min ago`
              }))}
              searchPlaceholder="Search recipients by patient ID, department, or blood type..."
              onSearch={(query) => {
                // Implement search filter logic here
                console.log('Search recipients:', query)
              }}
              onFilter={() => {
                // Implement filter logic here
                console.log('Filter recipients clicked')
              }}
              onAdd={() => {
                setShowAddRecipientModal(true)
              }}
              addButtonText="Add Recipient"
              renderItem={(recipient) => (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Patient #{recipient.patientId}</h4>
                      <p className="text-sm text-gray-500">{recipient.department} • {recipient.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{recipient.bloodType}</Badge>
                    <div className="text-sm text-gray-500">{recipient.unitsNeeded} units needed</div>
                    <Badge className={`${
                      recipient.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                      recipient.urgency === 'Urgent' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {recipient.urgency}
                    </Badge>
                    <div className="text-xs text-gray-500">{recipient.timeAgo}</div>
                    <Button size="sm" className={`${
                      recipient.urgency === 'Critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </>
              )}
            />
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <DataList
              title="Blood Request Management"
              description="Active and pending blood donation requests"
              items={Array.from({ length: 10 }).map((_, i) => ({
                id: i,
                requestId: `${2024}${String(i + 1).padStart(4, '0')}`,
                submittedTime: `${2 + i} hours ago`,
                bloodType: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'][i % 8],
                unitsRequested: 2 + (i % 4),
                status: i % 4 === 0 ? 'Pending' : i % 4 === 1 ? 'Approved' : i % 4 === 2 ? 'Processing' : 'Completed',
                department: ['Emergency Room', 'Surgery', 'ICU', 'Cardiology', 'Oncology'][i % 5],
                priority: i % 3 === 0 ? 'High' : i % 3 === 1 ? 'Medium' : 'Low'
              }))}
              searchPlaceholder="Search requests by ID, blood type, or department..."
              onSearch={(query) => {
                // Implement search filter logic here
                console.log('Search requests:', query)
              }}
              onFilter={() => {
                // Implement filter logic here
                console.log('Filter requests clicked')
              }}
              onAdd={() => {
                setShowAddRequestModal(true)
              }}
              addButtonText="New Request"
              renderItem={(request) => (
                <>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      request.status === 'Pending' ? 'bg-orange-100' :
                      request.status === 'Approved' ? 'bg-green-100' :
                      request.status === 'Processing' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      <Clock className={`h-5 w-5 ${
                        request.status === 'Pending' ? 'text-orange-600' :
                        request.status === 'Approved' ? 'text-green-600' :
                        request.status === 'Processing' ? 'text-blue-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium">Request #{request.requestId}</h4>
                      <p className="text-sm text-gray-500">{request.department} • {request.submittedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{request.bloodType}</Badge>
                    <div className="text-sm text-gray-500">{request.unitsRequested} units</div>
                    <Badge className={`${
                      request.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </Badge>
                    <Badge variant="outline" className={`${
                      request.priority === 'High' ? 'border-red-300 text-red-700' :
                      request.priority === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-green-300 text-green-700'
                    }`}>
                      {request.priority}
                    </Badge>
                    <div className="flex space-x-2">
                      {request.status === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-50"
                            onClick={() => {
                              // Implement approve request functionality here
                              alert(`Request #${request.requestId} approved`)
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-red-50"
                            onClick={() => {
                              // Implement decline request functionality here
                              alert(`Request #${request.requestId} declined`)
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            // Implement contact donor functionality here
                            alert(`Contacting donor for request #${request.requestId}`)
                          }}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Donor
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <AddDonorForm
        isOpen={showAddDonorModal}
        onClose={() => setShowAddDonorModal(false)}
        onSubmit={handleAddDonor}
      />

      <AddRecipientForm
        isOpen={showAddRecipientModal}
        onClose={() => setShowAddRecipientModal(false)}
        onSubmit={handleAddRecipient}
      />

      <AddBloodRequestForm
        isOpen={showAddRequestModal}
        onClose={() => setShowAddRequestModal(false)}
        onSubmit={handleAddBloodRequest}
      />
    </div>
  )
}
