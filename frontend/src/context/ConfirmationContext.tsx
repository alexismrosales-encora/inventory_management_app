import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ConfirmationContextType {
  deleteConfirmation: boolean
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>
  markItemsConfirmation: boolean
  setMarkItemsConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmationContext = createContext<ConfirmationContextType | null>(null)

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [markItemsConfirmation, setMarkItemsConfirmation] = useState(false)

  return (
    <ConfirmationContext.Provider value={{ deleteConfirmation, setDeleteConfirmation, markItemsConfirmation, setMarkItemsConfirmation }}>
      {children}
    </ConfirmationContext.Provider>
  )
}

export const useConfirmations = () => {
  const context = useContext(ConfirmationContext)
  if (!context) {
    throw new Error('useConfirmations must be used within a ConfirmationProvider')
  }
  return context
}
