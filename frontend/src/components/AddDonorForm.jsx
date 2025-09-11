import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, ModalFooter } from './ui/modal'
import { Badge } from './ui/badge'
import { User, Phone, Calendar, Droplet } from 'lucide-react'

export default function AddDonorForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone_number: '',
    blood_group: '',
    donation_date: ''
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      name: '',
      age: '',
      phone_number: '',
      blood_group: '',
      donation_date: ''
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Donor" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter donor's full name"
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
                min="18"
                max="65"
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

        {/* Blood Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Blood Information</h3>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Blood Type *
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 inline mr-1" />
              Last Donation Date *
            </label>
            <Input
              type="date"
              name="donation_date"
              value={formData.donation_date}
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
            className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <User className="h-4 w-4 mr-2" />
            Add Donor
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
