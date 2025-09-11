import React from 'react'

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'blue',
  size = 'md',
  showValue = true,
  showPercentage = false,
  className = '',
  animated = true,
  ...props
}) {
  const percentage = Math.min((value / max) * 100, 100)

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      shadow: 'shadow-blue-500/20'
    },
    green: {
      bg: 'bg-green-500',
      shadow: 'shadow-green-500/20'
    },
    red: {
      bg: 'bg-red-500',
      shadow: 'shadow-red-500/20'
    },
    yellow: {
      bg: 'bg-yellow-500',
      shadow: 'shadow-yellow-500/20'
    },
    purple: {
      bg: 'bg-purple-500',
      shadow: 'shadow-purple-500/20'
    }
  }

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5'
  }

  const colors = colorClasses[color] || colorClasses.blue

  return (
    <div className={`w-full ${className}`} {...props}>
      {label && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-2">
            {showValue && (
              <span className="text-sm text-gray-600 font-medium">{value}/{max}</span>
            )}
            {showPercentage && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      )}

      <div className={`w-full bg-gray-100 rounded-full ${sizeClasses[size]} overflow-hidden shadow-inner`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors.bg} ${
            animated ? 'shadow-lg' : ''
          } ${colors.shadow}`}
          style={{
            width: `${percentage}%`,
            boxShadow: animated ? `0 0 10px ${colors.bg.replace('bg-', '').replace('-500', '')}` : 'none'
          }}
        />
      </div>

      {/* Progress indicator dots */}
      {animated && (
        <div className="flex justify-between mt-1 px-1">
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
      )}
    </div>
  )
}
