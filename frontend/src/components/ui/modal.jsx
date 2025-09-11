import React from 'react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative z-10 w-full ${sizeClasses[size]} mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto`}>
        <Card className="border-0 shadow-none rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function ModalFooter({ children }) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      {children}
    </div>
  )
}
