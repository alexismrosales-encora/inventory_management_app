import React, { createContext, useState, useContext, ReactNode } from 'react'
import { InventoryItem } from '../types/inventory'

interface ProductModalContextType {
  shouldOpenForm: boolean
  setShouldOpenForm: React.Dispatch<React.SetStateAction<boolean>>
  itemForAction: InventoryItem | null
  setItemForAction: React.Dispatch<React.SetStateAction<InventoryItem | null>>
}

const ProductModalContext = createContext<ProductModalContextType | null>(null)

export const ProductModalProvider = ({ children }: { children: ReactNode }) => {
  const [shouldOpenForm, setShouldOpenForm] = useState(false)
  const [item, setItem] = useState<InventoryItem | null>(null)

  return (
    <ProductModalContext.Provider value={{ shouldOpenForm, setShouldOpenForm, itemForAction: item, setItemForAction: setItem }}>
      {children}
    </ProductModalContext.Provider>
  )
}

export const useProductModal = () => {
  const context = useContext(ProductModalContext)
  if (!context) {
    throw new Error('useProductModal must be used within a ProductModalProvider')
  }
  return context
}
