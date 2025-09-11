import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router';
// import { label } from '../components/ui/label';
import { useForm } from "react-hook-form"
import axios from 'axios';

import { Shield, ArrowLeft, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
  console.log(data);
  try {
    const res = await axios.post("http://localhost:5000/admin/login", data);
    console.log(res.status);

    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      navigate('/adash')

    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>
              Access the administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="username">Admin Username</label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  
                  {...register("username", { required: true })}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
