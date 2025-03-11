import React, { createContext, useState } from 'react'
import { Filters, InventoryItem } from '../types/inventory'
import { pageSizes } from '../utils/inventory.utils'

interface FilterContextType {
  filters: Filters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

interface PaginationFilterType {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
}

interface PaginationSizeType {
  pageSize: number,
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

interface PaginationActionsType {
  paginationFilterType: PaginationFilterType,
  paginationSizeType: PaginationSizeType,
}

interface TriggerTableUpdateType {
  shouldUpdateTable: boolean,
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>
}

interface ToggleForCreateAndEditProduct {
  shouldOpenForm: boolean,
  setShouldOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
  item: InventoryItem | null,
  setItem: React.Dispatch<React.SetStateAction<InventoryItem | null>>
}

interface InventoryContextType {
  filterContext: FilterContextType,
  paginationContext: PaginationActionsType
  triggerTableUpdateType: TriggerTableUpdateType
  toggleForCreateAndEditProduct: ToggleForCreateAndEditProduct
}

export const InventoryContext = createContext<InventoryContextType | null>(null)

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    stockStatus: null,
  })


  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[1])

  const [updateTable, setUpdateTable] = useState(false)

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [item, setItem] = useState<InventoryItem | null>(null)

  const filterContext: FilterContextType = {
    filters,
    setFilters,
  }

  const paginationContext: PaginationActionsType = {
    paginationFilterType: {
      currentPage,
      setCurrentPage,
      totalItems,
      setTotalItems,
    },
    paginationSizeType: {
      pageSize,
      setPageSize,
    },
  }

  const tableUpdateContext: TriggerTableUpdateType = {
    shouldUpdateTable: updateTable,
    setShouldUpdateTable: setUpdateTable
  }

  const toggleForCreateAndEditProductContext: ToggleForCreateAndEditProduct = {
    shouldOpenForm: openForm,
    setShouldOpenForm: setOpenForm,
    item: item,
    setItem: setItem
  }

  return (
    <InventoryContext.Provider value={{ filterContext, paginationContext, triggerTableUpdateType: tableUpdateContext, toggleForCreateAndEditProduct: toggleForCreateAndEditProductContext }}>
      {children}
    </InventoryContext.Provider>
  )
}
