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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">System Administration</h1>
                <p className="text-sm text-gray-500">LifeFlow Platform Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm"><Bell className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger value="hospitals" onClick={() => setActiveTab("hospitals")}>Hospital Directory</TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>Pending Verifications</TabsTrigger>
            <TabsTrigger value="users" onClick={() => setActiveTab("users")}>Users</TabsTrigger>
            <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>Analytics</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUser ?? 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Hospitals</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalHospitals ?? 0}</div>
                  <p className="text-xs text-muted-foreground">{stats?.pendingHospitals ?? 0} pending verification</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Donations</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalDonations ?? 0}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Validated Hospitals</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.validatedHospitals ?? 0}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hospital Directory (approved hospitals) */}
          <TabsContent value="hospitals">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle>Hospital Directory</CardTitle>
                    <CardDescription>Approved hospitals on the platform</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {approvedHospitals.length === 0 ? (
                  <p className="text-sm text-gray-500">No hospitals found</p>
                ) : (
                  approvedHospitals.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{h.hospital_name}</h4>
                          <p className="text-sm text-gray-500">License: {h.license_number}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Verifications */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle>Pending Verifications</CardTitle>
                    <CardDescription>Hospitals awaiting approval</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {pendingHospitals.length === 0 ? (
                  <p className="text-sm text-gray-500">No pending hospitals</p>
                ) : (
                  pendingHospitals.map((h) => (
                    <div key={h.license_number} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{h.hospital_name}</p>
                        <p className="text-sm text-gray-500">License: {h.license_number}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => approveHospital(h.license_number)}>
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle>User Directory</CardTitle>
                    <CardDescription>Manage platform users</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-sm text-gray-500">No users found</p>
                ) : (
                  users.map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{u.fullname || "—"}</h4>
                          <p className="text-sm text-gray-500">
                            {u.phone_number || "—"} • {u.blood_group || "—"} • Age {u.age ?? "—"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{u.type || "N/A"}</Badge>
                        {u.medical_history ? (
                          <Badge className="bg-yellow-100 text-yellow-800">History</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics (placeholder) */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Charts and deeper metrics (coming soon)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Analytics to be added.</p>
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
