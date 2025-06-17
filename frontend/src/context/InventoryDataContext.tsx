import React, { createContext, useState, useContext, ReactNode } from 'react'
import { InventoryItem } from '../types/inventory'

interface InventoryDataContextType {
  inventoryItems: InventoryItem[]
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

const InventoryDataContext = createContext<InventoryDataContextType | null>(null)

export const InventoryDataProvider = ({ children }: { children: ReactNode }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  return (
    <InventoryDataContext.Provider value={{ inventoryItems, setInventoryItems }}>
      {children}
    </InventoryDataContext.Provider>
  )
}

export const useInventoryData = () => {
  const context = useContext(InventoryDataContext)
  if (!context) {
    throw new Error('useInventoryData must be used within an InventoryDataProvider')
  }
  return context
}
