import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './card'

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className = '',
  ...props
}) {
  return (
    <Card className={`transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${className}`} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center space-x-2 mt-1">
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
          {trend && trendValue && (
            <span className={`text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
