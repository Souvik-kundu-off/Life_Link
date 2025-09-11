import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, ModalFooter } from './ui/modal'
import { Badge } from './ui/badge'
import { User, Droplet, Hash, Building, Stethoscope, AlertTriangle, FileText } from 'lucide-react'

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
    <Modal isOpen={isOpen} onClose={onClose} title="New Blood Request" size="md">
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
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                placeholder="Enter patient's name"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Stethoscope className="h-4 w-4 inline mr-1" />
                Doctor Name *
              </label>
              <Input
                type="text"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="h-11"
                required
              />
            </div>
          </div>

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
        </div>

        {/* Blood Request Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Blood Request Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Blood Type Required *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {bloodTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={formData.blood_group === type ? "default" : "outline"}
                    className={`cursor-pointer text-center py-3 px-3 text-sm font-medium transition-all duration-200 hover:scale-105 ${
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
                <Hash className="h-4 w-4 inline mr-1" />
                Units Required *
              </label>
              <Input
                type="number"
                name="units_requested"
                value={formData.units_requested}
                onChange={handleChange}
                placeholder="Number of units needed"
                min="1"
                max="10"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              Priority Level *
            </label>
            <div className="flex flex-wrap gap-3">
              {priorities.map((priority) => (
                <Badge
                  key={priority}
                  variant={formData.priority === priority ? "default" : "outline"}
                  className={`cursor-pointer py-3 px-6 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    formData.priority === priority
                      ? priority === 'High'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                        : priority === 'Medium'
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-md'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                      : priority === 'High'
                      ? 'hover:bg-red-50 hover:border-red-300'
                      : priority === 'Medium'
                      ? 'hover:bg-yellow-50 hover:border-yellow-300'
                      : 'hover:bg-green-50 hover:border-green-300'
                  }`}
                  onClick={() => handlePrioritySelect(priority)}
                >
                  {priority}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4 inline mr-1" />
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information or special requirements..."
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              rows="4"
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
            <Droplet className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
