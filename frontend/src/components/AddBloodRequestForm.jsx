import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, ModalFooter } from './ui/modal'
import { Badge } from './ui/badge'

export default function AddBloodRequestForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    blood_group: '',
    units_requested: '',
    department: '',
    priority: 'Medium',
    patient_name: '',
    doctor_name: '',
    notes: ''
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const departments = ['Emergency Room', 'ICU', 'Surgery', 'Cardiology', 'Oncology', 'Pediatrics', 'Neurology', 'Orthopedics']
  const priorities = ['Low', 'Medium', 'High']

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

  const handlePrioritySelect = (priority) => {
    setFormData({
      ...formData,
      priority: priority
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      request_date: new Date().toISOString().split('T')[0] // Current date
    })
    // Reset form
    setFormData({
      blood_group: '',
      units_requested: '',
      department: '',
      priority: 'Medium',
      patient_name: '',
      doctor_name: '',
      notes: ''
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Blood Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <Input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            placeholder="Enter patient's name"
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
            Units Required
          </label>
          <Input
            type="number"
            name="units_requested"
            value={formData.units_requested}
            onChange={handleChange}
            placeholder="Number of units needed"
            min="1"
            max="10"
            required
          />
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
            Doctor Name
          </label>
          <Input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            placeholder="Enter doctor's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <div className="flex space-x-2">
            {priorities.map((priority) => (
              <Badge
                key={priority}
                variant={formData.priority === priority ? "default" : "outline"}
                className={`cursor-pointer ${
                  priority === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                  priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                  'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
                onClick={() => handlePrioritySelect(priority)}
              >
                {priority}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Submit Request
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
