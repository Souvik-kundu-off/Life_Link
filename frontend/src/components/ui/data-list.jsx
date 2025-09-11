import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Input } from './input'
import { Search, Filter, Plus, Database } from 'lucide-react'

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
    <Card className={`shadow-sm border-gray-200 ${className}`} {...props}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
              {description && <CardDescription className="text-gray-600 mt-1">{description}</CardDescription>}
            </div>
          </div>
          {onAdd && (
            <Button
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 h-11 px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {(onSearch || onFilter) && (
          <div className="flex gap-4 mb-6">
            {onSearch && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}
            {onFilter && (
              <Button
                variant="outline"
                onClick={onFilter}
                className="h-11 px-4 border-gray-300 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            )}
          </div>
        )}

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No items found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new item</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
              >
                {renderItem(item, index)}
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Showing {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
