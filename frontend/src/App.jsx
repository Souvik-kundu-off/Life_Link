import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import DonorDashboard from './components/DonorDashboard'
import HospitalDashboard from './components/HospitalDashboard'
import AdminDashboard from './components/AdminDashboard'
import Navigation from './components/Navigation'
import AdminLogin from './pages/AdminLogin'
import IndividualRegistration from './pages/IndividualRegistration'
import HospitalRegistrationPage from './pages/HospitalRegistration'
import { Routes, Route } from 'react-router'

function App() {
  

  

  return (
    <>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path='alogin' element={<AdminLogin/>} />
        <Route path='ireg' element={<IndividualRegistration/>} />
        <Route path='hreg' element={<HospitalRegistrationPage/>}/>
        <Route path='ddash' element={<DonorDashboard/>} />
        <Route path='hdash' element={<HospitalDashboard/>}/>
        <Route path='adash' element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App