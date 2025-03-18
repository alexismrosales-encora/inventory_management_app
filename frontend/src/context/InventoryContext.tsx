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
  deleteConfirmation: boolean,
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  item: InventoryItem | null,
  setItem: React.Dispatch<React.SetStateAction<InventoryItem | null>>
}

interface InventoryItemsType {
  inventoryItems: InventoryItem[],
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

interface SortingContextType {
  sortBy: string[];
  setSortBy: React.Dispatch<React.SetStateAction<string[]>>
  sortOrder: string[];
  setSortOrder: React.Dispatch<React.SetStateAction<string[]>>
}

interface InventoryItemsOutOfStockType {
  markItemsConfirmation: boolean,
  setMarkItemsConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

interface InventoryContextType {
  filterContext: FilterContextType
  paginationContext: PaginationActionsType
  triggerTableUpdateType: TriggerTableUpdateType
  toggleForCreateAndEditProduct: ToggleForCreateAndEditProduct
  inventoryItems: InventoryItemsType
  sortingContext: SortingContextType
  inventoryItemsOutOfStockType: InventoryItemsOutOfStockType
}

export const InventoryContext = createContext<InventoryContextType | null>(null)

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categories: [],
    stockStatus: null,
  })


  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[1])

  const [updateTable, setUpdateTable] = useState(false)

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [sortBy, setSortBy] = useState(["datecreated"]);
  const [sortOrder, setSortOrder] = useState<string[]>(["asc"]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [markItemsConfirmation, setMarkItemsConfirmation] = useState(false)

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
    setItem: setItem,
    deleteConfirmation: deleteConfirmation,
    setDeleteConfirmation: setDeleteConfirmation
  }

  const inventoryItemsContext: InventoryItemsType = {
    inventoryItems: inventoryItems,
    setInventoryItems: setInventoryItems
  }
  const sortingContext: SortingContextType = {
    sortBy: sortBy,
    setSortBy: setSortBy,
    sortOrder: sortOrder,
    setSortOrder: setSortOrder
  }

  const inventoryItemsOutOfStockType: InventoryItemsOutOfStockType = {
    markItemsConfirmation: markItemsConfirmation,
    setMarkItemsConfirmation: setMarkItemsConfirmation
  }



  return (
    <InventoryContext.Provider value={{ filterContext, paginationContext, triggerTableUpdateType: tableUpdateContext, toggleForCreateAndEditProduct: toggleForCreateAndEditProductContext, inventoryItems: inventoryItemsContext, sortingContext: sortingContext, inventoryItemsOutOfStockType }}>
      {children}
    </InventoryContext.Provider>
  )
}
