import React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Building2, ArrowLeft, LogIn } from "lucide-react";

export default function HospitalRegistrationPage() {
  const rform = useForm();
  const lform = useForm();
  const navigate = useNavigate();

  // Register hospital
  const registerSubmit = async (data) => {
    try {
      console.log("Register Data:", data);
      const res = await axios.post("http://localhost:5000/hospital/register", data);
      alert("Hospital registered successfully! Please wait for admin approval before logging in.");
      console.log("Response:", res.data);
      // Do not navigate to dashboard immediately after registration
      // navigate('/hdash');
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  // Login hospital staff
  const loginSubmit = async (data) => {
    try {
      console.log("Login Data:", data);
      const res = await axios.post("http://localhost:5000/hospital/login", data);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        alert("Login successful!");
        navigate('/hdash');

        console.log("Response:", res.data);
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        alert("Login failed: Your hospital registration is pending admin approval.");
      } else {
        alert("Login failed. Check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6 flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Hospital Access</CardTitle>
            <CardDescription>
              Access the blood donation management system
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login" className="space-y-4">
                <form
                  className="space-y-4"
                  onSubmit={lform.handleSubmit(loginSubmit)}
                >
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="staff@hospital.com"
                      {...lform.register("email", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <Input
                      id="password"
                      type="password"
                      {...lform.register("password", { required: true })}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </form>
              </TabsContent>

              {/* REGISTER TAB */}
              <TabsContent value="register" className="space-y-4">
                <form
                  className="space-y-4"
                  onSubmit={rform.handleSubmit(registerSubmit)}
                >
                  <div className="space-y-2">
                    <label htmlFor="hospitalName">Hospital Name</label>
                    <Input
                      id="hospitalName"
                      placeholder="City General Hospital"
                      {...rform.register("name", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="licenseNumber">License Number</label>
                    <Input
                      id="licenseNumber"
                      placeholder="XXXXXXXXXXXX"
                      {...rform.register("license_number", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address">Address</label>
                    <Input
                      id="address"
                      placeholder="123 Medical Drive"
                      {...rform.register("address", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber">Phone</label>
                    <Input
                      id="phoneNumber"
                      placeholder="+1 (555) 123-4567"
                      {...rform.register("phone_number", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="staffName">Staff Name</label>
                    <Input
                      id="staffName"
                      placeholder="John Doe"
                      {...rform.register("staffName", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="registerEmail">Email</label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="staff@hospital.com"
                      {...rform.register("email", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="registerPassword">Password</label>
                    <Input
                      id="registerPassword"
                      type="password"
                      {...rform.register("password", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Description">Description</label>
                    <Input
                      id="description"
                      placeholder="City General Hospital"
                      {...rform.register("description", { required: true })}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Register Hospital
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Backend ready: connect your Node.js/Express/MongoDB API at
                <code className="ml-1">/api/hospital/register</code> and
                <code className="ml-1">/api/hospital/login</code>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
