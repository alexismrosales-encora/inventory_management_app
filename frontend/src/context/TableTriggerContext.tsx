import { createContext, useState, useContext, ReactNode } from 'react'

interface TableTriggerContextType {
  shouldUpdateTable: boolean
  triggerUpdate: () => void
}

const TableTriggerContext = createContext<TableTriggerContextType | null>(null)

export const TableTriggerProvider = ({ children }: { children: ReactNode }) => {
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false)

  // Expose a stable function to trigger updates
  const triggerUpdate = () => setShouldUpdateTable(prev => !prev)

  return (
    <TableTriggerContext.Provider value={{ shouldUpdateTable, triggerUpdate }}>
      {children}
    </TableTriggerContext.Provider>
  )
}

export const useTableTrigger = () => {
  const context = useContext(TableTriggerContext)
  if (!context) {
    throw new Error('useTableTrigger must be used within a TableTriggerProvider')
  }
  return context
}
