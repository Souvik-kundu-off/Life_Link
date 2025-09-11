import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className = '',
  color = 'blue',
  ...props
}) {
  const colorClasses = {
    blue: {
      icon: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    red: {
      icon: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    green: {
      icon: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    yellow: {
      icon: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    purple: {
      icon: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    }
  }

  const colors = colorClasses[color] || colorClasses.blue

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0 shadow-md ${className}`} {...props}>
      {/* Background gradient */}
      <div className={`absolute inset-0 ${colors.bg} opacity-50`} />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        {Icon && (
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>

        <div className="flex items-center justify-between">
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}

          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up' ? colors.trendUp : trend === 'down' ? colors.trendDown : 'text-gray-500'
            }`}>
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {trend === 'neutral' && <Minus className="h-3 w-3" />}
              <span>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
