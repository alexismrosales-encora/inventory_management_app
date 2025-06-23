
import React, { createContext, useState, useContext, ReactNode } from 'react'
import { pageSizes } from '../utils/inventory.utils'

// This interface now correctly combines PaginationFilterType and PaginationSizeType
// into a single, cohesive unit for managing all pagination state.
interface PaginationContextType {
  // Properties from the original PaginationFilterType
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>

  // Properties from the original PaginationSizeType
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

const PaginationContext = createContext<PaginationContextType | null>(null)

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  // Each piece of state from the original implementation is managed here
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[1]) // Using the default from your utils

  // The context provider now offers a single, flat object with all necessary
  // state and setters for pagination.
  const value = {
    currentPage,
    setCurrentPage,
    totalItems,
    setTotalItems,
    pageSize,
    setPageSize,
  }

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  )
}

// The custom hook for consuming this context remains the same.
export const usePagination = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }
  return context
}

