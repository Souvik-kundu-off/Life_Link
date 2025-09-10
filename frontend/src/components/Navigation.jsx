import React, { useState } from 'react'
import { Button } from './ui/button'
import { Heart, Building2, Shield, User } from 'lucide-react'

export default function Navigation({ currentView, onViewChange }) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-lg border p-2 flex space-x-2">
        <Button
          variant={currentView === 'landing' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('landing')}
          className="rounded-full"
        >
          <Heart className="h-4 w-4 mr-2" />
          Home
        </Button>
        <Button
          variant={currentView === 'donor' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('donor')}
          className="rounded-full"
        >
          <User className="h-4 w-4 mr-2" />
          Donor
        </Button>
        <Button
          variant={currentView === 'hospital' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('hospital')}
          className="rounded-full"
        >
          <Building2 className="h-4 w-4 mr-2" />
          Hospital
        </Button>
        <Button
          variant={currentView === 'admin' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('admin')}
          className="rounded-full"
        >
          <Shield className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </div>
    </div>
  )
}