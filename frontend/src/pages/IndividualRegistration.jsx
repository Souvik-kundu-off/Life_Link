import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
// import { label } from '../ui-components/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Heart, ArrowLeft, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios from 'axios';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function IndividualRegistration({ onLogin, onBack }) {
  const navigate = useNavigate();
  const rform = useForm();
  const lform = useForm();
  const Login = async(data)=>{
    console.log("login");
    console.log(data);
    const res = await axios.post("http://localhost:5000/doner/login", data);
    console.log(res);

    if(res.status===200){
      localStorage.setItem('token', res.data.token);

      alert("Login Successful");
      navigate('/ddash');

    }
    else{
      alert("Login Failed");
    }
  }
  const register = async(data)=>{
    console.log("register");
    const res =await axios.post("http://localhost:5000/doner/register", data);
    if(res.status===200){
      alert("Registration Successful");
    }
    else{
      alert("Registration Failed");
    }
    console.log(data);
    
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Individual Access</CardTitle>
            <CardDescription>
              Join as a blood donor or recipient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form className="space-y-4" onSubmit={lform.handleSubmit(Login)}>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="donor@example.com"
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
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login (Connect Backend)
                  </Button>
                </form>
              </TabsContent>
              
              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <form className="space-y-4" onSubmit={rform.handleSubmit(register)}>
                  <div className="space-y-2">
                    <label htmlFor="name">Full Name</label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...rform.register("name", { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="age">Age</label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      {...rform.register("age", { required: true, min: 18, max: 65 })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <select 
                      id="bloodGroup"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                       {...rform.register("blood_group", { required: true })}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone">Phone</label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      {...rform.register("phone_number", { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address">Address</label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      {...rform.register("address", { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="donor@example.com"
                      {...rform.register("email", { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <Input
                      id="password"
                      type="password"
                      {...rform.register("password", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="Mediacl History">Medical History</label>
                    <Input
                      id="medical_history"
                      placeholder="(optional)"
                      {...rform.register("medical_history")}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label>I want to:</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-gray-400">
                        <input type="checkbox"
                        value="donor"
                        {...rform.register("type", { required: true })}
                        />
                        <span>Donate blood</span>
                      </label>
                      <label className="flex items-center space-x-2 text-gray-400">
                        <input type="checkbox" 
                        value="recipient"
                        {...rform.register("type", { required: true })}
                        />
                        <span>Receive blood donations</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Register (Connect Backend)
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                Ready for backend integration. Connect your Node.js/Express.js/MongoDB backend to enable registration and authentication.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
