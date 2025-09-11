import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, ModalFooter } from './ui/modal'
import { Badge } from './ui/badge'

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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Recipient">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient's full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="1"
            max="120"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Type Required
          </label>
          <div className="grid grid-cols-4 gap-2">
            {bloodTypes.map((type) => (
              <Badge
                key={type}
                variant={formData.blood_group === type ? "default" : "outline"}
                className="cursor-pointer text-center py-2"
                onClick={() => handleBloodTypeSelect(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doctor
          </label>
          <Input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Enter doctor's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <div className="flex space-x-2">
            {urgencies.map((urgency) => (
              <Badge
                key={urgency}
                variant={formData.urgency === urgency ? "default" : "outline"}
                className={`cursor-pointer ${
                  urgency === 'Critical' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                  urgency === 'Urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
                onClick={() => handleUrgencySelect(urgency)}
              >
                {urgency}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Request Date
          </label>
          <Input
            type="date"
            name="request_date"
            value={formData.request_date}
            onChange={handleChange}
            required
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Add Recipient
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
