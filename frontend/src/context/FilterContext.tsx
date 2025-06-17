import { createContext, ReactNode, useContext, useState } from 'react'
import { Filters } from '../types/inventory'

// Define the shape of the context data
interface FilterContextType {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

// Create context with a null default value
const FilterContext = createContext<FilterContextType | null>(null)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    stockStatus: null,
  })

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

// Create a custom hook for easy consumption
export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
