import React, { createContext, useState, useContext, ReactNode } from 'react'

/**
 * SortingContextType
 *
 * Defines the sorting state for inventory items.
 */
interface SortingContextType {
  sortBy: string[]
  setSortBy: React.Dispatch<React.SetStateAction<string[]>>
  sortOrder: string[]
  setSortOrder: React.Dispatch<React.SetStateAction<string[]>>
}

// Create the context with a default value of null.
const SortingContext = createContext<SortingContextType | null>(null)

/**
 * SortingProvider Component
 *
 * Provides the SortingContext to its children components.
 * It initializes and manages the state for table sorting.
 */
export const SortingProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state based on the values from your original context
  const [sortBy, setSortBy] = useState(["datecreated"])
  const [sortOrder, setSortOrder] = useState<string[]>(["asc"])

  const value = {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  }

  return (
    <SortingContext.Provider value={value}>
      {children}
    </SortingContext.Provider>
  )
}

/**
 * useSorting Hook
 *
 * A custom hook to easily consume the SortingContext.
 */
export const useSorting = () => {
  const context = useContext(SortingContext)
  if (!context) {
    throw new Error('useSorting must be used within a SortingProvider')
  }
  return context
}
