import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, ModalFooter } from './ui/modal'
import { Badge } from './ui/badge'
import { User, Phone, Calendar, Droplet, Stethoscope, Building } from 'lucide-react'

export default function AddRecipientForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone_number: '',
    blood_group: '',
    request_date: '',
    department: '',
    doctor: '',
    urgency: 'Normal'
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const departments = ['Emergency Room', 'ICU', 'Surgery', 'Cardiology', 'Oncology', 'Pediatrics', 'Neurology', 'Orthopedics']
  const urgencies = ['Normal', 'Urgent', 'Critical']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleBloodTypeSelect = (bloodType) => {
    setFormData({
      ...formData,
      blood_group: bloodType
    })
  }

  const handleUrgencySelect = (urgency) => {
    setFormData({
      ...formData,
      urgency: urgency
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      name: '',
      age: '',
      phone_number: '',
      blood_group: '',
      request_date: '',
      department: '',
      doctor: '',
      urgency: 'Normal'
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Recipient" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Patient Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Patient Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter patient's full name"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age *
              </label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="120"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number *
            </label>
            <Input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="h-11"
              required
            />
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Medical Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Building className="h-4 w-4 inline mr-1" />
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Stethoscope className="h-4 w-4 inline mr-1" />
                Doctor Name *
              </label>
              <Input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              <Droplet className="h-4 w-4 inline mr-1" />
              Blood Type Required *
            </label>
            <div className="grid grid-cols-4 gap-3">
              {bloodTypes.map((type) => (
                <Badge
                  key={type}
                  variant={formData.blood_group === type ? "default" : "outline"}
                  className={`cursor-pointer text-center py-3 px-4 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    formData.blood_group === type
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                      : 'hover:bg-red-50 hover:border-red-300'
                  }`}
                  onClick={() => handleBloodTypeSelect(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Urgency Level *
            </label>
            <div className="flex flex-wrap gap-3">
              {urgencies.map((urgency) => (
                <Badge
                  key={urgency}
                  variant={formData.urgency === urgency ? "default" : "outline"}
                  className={`cursor-pointer py-3 px-6 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    formData.urgency === urgency
                      ? urgency === 'Critical'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                        : urgency === 'Urgent'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : urgency === 'Critical'
                      ? 'hover:bg-red-50 hover:border-red-300'
                      : urgency === 'Urgent'
                      ? 'hover:bg-orange-50 hover:border-orange-300'
                      : 'hover:bg-blue-50 hover:border-blue-300'
                  }`}
                  onClick={() => handleUrgencySelect(urgency)}
                >
                  {urgency}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 inline mr-1" />
              Request Date *
            </label>
            <Input
              type="date"
              name="request_date"
              value={formData.request_date}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>
        </div>

        <ModalFooter className="border-t border-gray-100 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <User className="h-4 w-4 mr-2" />
            Add Recipient
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
