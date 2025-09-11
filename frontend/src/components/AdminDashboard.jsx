// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Shield,
  Users,
  Building2,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  LogOut,
  Bell,
  Activity,
  Clock,
  TrendingUp,
  Server,
  Database,
  Zap,
  Plus,
  FileText,
  UserPlus,
  Hospital,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const API_BASE = "http://localhost:5000/admin"; // keep backend unchanged

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/alogin");
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const [statsRes, approvedRes, pendingRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/getnumbers`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_BASE}/getapprovedhospitals`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_BASE}/getpendinghospitals`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_BASE}/getusers`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setStats(statsRes.data || {});
        setApprovedHospitals(approvedRes.data?.data || []);
        setPendingHospitals(pendingRes.data?.data || []);
        setUsers(usersRes.data?.data || []);
      } catch (err) {
        console.error("Failed loading admin data", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/alogin");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, navigate]);

  const approveHospital = async (license_number) => {
    try {
      await axios.patch(
        `${API_BASE}/approvehospital/${license_number}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // remove from pending, add to approved list (simple client-side update)
      setPendingHospitals((prev) => prev.filter((h) => h.license_number !== license_number));
      const approved = pendingHospitals.find((h) => h.license_number === license_number);
      if (approved) {
        setApprovedHospitals((prev) => [...prev, { ...approved, isValidated: true }]);
      }
    } catch (err) {
      console.error("Approve failed", err);
      alert("Failed to approve hospital.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/alogin");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!stats) return <p className="p-6 text-red-500">Failed to load stats</p>;



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg border-b border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">System Administration</h1>
                <p className="text-sm text-blue-100">LifeFlow Platform Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-20">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-20">
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-blue-600"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>

          {/* Navigation Tabs in Header */}
          <div className="border-t border-blue-500 border-opacity-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs value={activeTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white bg-opacity-10 border border-white border-opacity-20 mt-4 mb-2">
                  <TabsTrigger
                    value="overview"
                    onClick={() => setActiveTab("overview")}
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="hospitals"
                    onClick={() => setActiveTab("hospitals")}
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
                  >
                    Hospital Directory
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    onClick={() => setActiveTab("pending")}
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
                  >
                    Pending Verifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    onClick={() => setActiveTab("users")}
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
                  >
                    Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    onClick={() => setActiveTab("analytics")}
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} className="space-y-6">

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-800">Total Users</CardTitle>
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stats?.totalUser ?? 0}</div>
                  <p className="text-xs text-blue-600">Registered users</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-green-800">Hospitals</CardTitle>
                  <div className="bg-green-500 p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-1">{stats?.totalHospitals ?? 0}</div>
                  <p className="text-xs text-green-600">{stats?.pendingHospitals ?? 0} pending verification</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-red-800">Active Donations</CardTitle>
                  <div className="bg-red-500 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-1">{stats?.totalDonations ?? 0}</div>
                  <p className="text-xs text-red-600">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-800">Validated Hospitals</CardTitle>
                  <div className="bg-purple-500 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-1">{stats?.validatedHospitals ?? 0}</div>
                  <p className="text-xs text-purple-600">Approved & verified</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Feed & System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity Feed */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription className="text-indigo-100">Latest platform activities</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {/* Recent Hospital Approvals */}
                    {approvedHospitals.slice(0, 3).map((hospital, index) => (
                      <div key={`approved-${index}`} className="flex items-start space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">Hospital Approved</p>
                          <p className="text-xs text-gray-600 truncate">{hospital.hospital_name}</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    ))}

                    {/* Recent User Registrations */}
                    {users.slice(0, 2).map((user, index) => (
                      <div key={`user-${index}`} className="flex items-start space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserPlus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">New User Registered</p>
                          <p className="text-xs text-gray-600 truncate">{user.fullname || "Anonymous User"}</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                    ))}

                    {/* Pending Hospital Activities */}
                    {pendingHospitals.slice(0, 2).map((hospital, index) => (
                      <div key={`pending-${index}`} className="flex items-start space-x-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-all duration-200">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">Hospital Awaiting Review</p>
                          <p className="text-xs text-gray-600 truncate">{hospital.hospital_name}</p>
                          <p className="text-xs text-gray-500">30 minutes ago</p>
                        </div>
                      </div>
                    ))}

                    {approvedHospitals.length === 0 && users.length === 0 && pendingHospitals.length === 0 && (
                      <div className="text-center py-8">
                        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-700">No Recent Activity</p>
                        <p className="text-sm text-gray-500">Activity will appear here as users and hospitals interact with the platform</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* System Health Indicators */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        <Server className="h-5 w-5 mr-2" />
                        System Health
                      </CardTitle>
                      <CardDescription className="text-emerald-100">Platform status & performance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Platform Status */}
                    <div className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Server className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Platform Status</p>
                          <p className="text-xs text-gray-600">All systems operational</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>

                    {/* Database Status */}
                    <div className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Database</p>
                          <p className="text-xs text-gray-600">Connected & healthy</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Healthy</Badge>
                    </div>

                    {/* API Response Time */}
                    <div className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">API Response</p>
                          <p className="text-xs text-gray-600">Average: 120ms</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Fast</Badge>
                    </div>

                    {/* System Uptime */}
                    <div className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">System Uptime</p>
                          <p className="text-xs text-gray-600">99.9% this month</p>
                        </div>
                      </div>
                      <Badge className="bg-indigo-100 text-indigo-800">Excellent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hospital Directory (approved hospitals) */}
          <TabsContent value="hospitals">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle className="text-white">Hospital Directory</CardTitle>
                    <CardDescription className="text-blue-100">Approved hospitals on the platform</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {approvedHospitals.length === 0 ? (
                    <p className="text-sm text-gray-500">No hospitals found</p>
                  ) : (
                    approvedHospitals.map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{h.hospital_name}</h4>
                            <p className="text-sm text-gray-600">License: {h.license_number}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-sm">Verified</Badge>
                          <Button variant="outline" size="sm" className="hover:bg-blue-50">Manage</Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Verifications */}
          <TabsContent value="pending">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle className="text-white">Pending Verifications</CardTitle>
                    <CardDescription className="text-yellow-100">Hospitals awaiting approval</CardDescription>
                  </div>
                  <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-white font-semibold">{pendingHospitals.length} pending</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {pendingHospitals.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">All caught up!</p>
                      <p className="text-sm text-gray-500">No pending hospitals to review</p>
                    </div>
                  ) : (
                    pendingHospitals.map((h) => (
                      <div key={h.license_number} className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm">
                            <AlertTriangle className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{h.hospital_name}</h4>
                            <p className="text-sm text-gray-600">License: {h.license_number}</p>
                            <Badge className="bg-yellow-100 text-yellow-800 mt-1">Awaiting Review</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => approveHospital(h.license_number)}
                            className="bg-green-500 hover:bg-green-600 text-white shadow-sm"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 shadow-sm"
                          >
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle className="text-white">User Directory</CardTitle>
                    <CardDescription className="text-purple-100">Manage platform users</CardDescription>
                  </div>
                  <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-white font-semibold">{users.length} users</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">No users found</p>
                      <p className="text-sm text-gray-500">Users will appear here once registered</p>
                    </div>
                  ) : (
                    users.map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{u.fullname || "—"}</h4>
                            <p className="text-sm text-gray-600">
                              {u.phone_number || "—"} • {u.blood_group || "—"} • Age {u.age ?? "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                            {u.type || "N/A"}
                          </Badge>
                          {u.medical_history ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 shadow-sm">
                              Medical History
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-sm">
                              Healthy
                            </Badge>
                          )}
                          <Button variant="outline" size="sm" className="hover:bg-purple-50 border-purple-300">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics (placeholder) */}
          <TabsContent value="analytics">
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle className="text-white">Analytics Dashboard</CardTitle>
                    <CardDescription className="text-teal-100">Platform performance and insights</CardDescription>
                  </div>
                  <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-white font-semibold">Coming Soon</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Placeholder Chart Cards */}
                  <div className="bg-white bg-opacity-70 rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Donation Trends</h3>
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-teal-600" />
                      </div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Chart Placeholder</span>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-70 rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">User Growth</h3>
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-cyan-600" />
                      </div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Chart Placeholder</span>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-70 rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Hospital Activity</h3>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Chart Placeholder</span>
                    </div>
                  </div>
                </div>

                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    We're working on comprehensive analytics including real-time charts, detailed reports,
                    and predictive insights to help you better understand platform performance.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge className="bg-teal-100 text-teal-800">Real-time Charts</Badge>
                    <Badge className="bg-cyan-100 text-cyan-800">Custom Reports</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Predictive Analytics</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ErrorBoundary wrapper to avoid full-app crash
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-red-500">Something went wrong in Admin Dashboard.</div>;
    }
    return this.props.children;
  }
}

export default function WrappedAdminDashboard() {
  return (
    <ErrorBoundary>
      <AdminDashboard />
    </ErrorBoundary>
  );
}
