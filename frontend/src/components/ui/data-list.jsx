import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Input } from './input'
import { Search, Filter, Plus } from 'lucide-react'

export function DataList({
  title,
  description,
  items = [],
  renderItem,
  searchPlaceholder = "Search...",
  onSearch,
  onFilter,
  onAdd,
  addButtonText = "Add New",
  className = '',
  ...props
}) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {onAdd && (
            <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {(onSearch || onFilter) && (
          <div className="flex space-x-4 mb-6">
            {onSearch && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-10"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}
            {onFilter && (
              <Button variant="outline" onClick={onFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No items found</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                {renderItem(item, index)}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
