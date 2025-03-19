import React, { createContext, useState } from 'react'
import { Filters, InventoryItem } from '../types/inventory'
import { pageSizes } from '../utils/inventory.utils'

/**
 * FilterContextType
 *
 * Defines the structure for filtering data in the inventory.
 *
 * @property {Filters} filters - The current filter settings.
 * @property {React.Dispatch<React.SetStateAction<Filters>>} setFilters - Function to update the filter settings.
 */
interface FilterContextType {
  filters: Filters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

/**
 * PaginationFilterType
 *
 * Defines the pagination information for filtering items.
 *
 * @property {number} currentPage - The current page number.
 * @property {React.Dispatch<React.SetStateAction<number>>} setCurrentPage - Function to update the current page.
 * @property {number} totalItems - The total number of items.
 * @property {React.Dispatch<React.SetStateAction<number>>} setTotalItems - Function to update the total items.
 */
interface PaginationFilterType {
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
}

/**
 * PaginationSizeType
 *
 * Defines the page size settings for pagination.
 *
 * @property {number} pageSize - The number of items per page.
 * @property {React.Dispatch<React.SetStateAction<number>>} setPageSize - Function to update the page size.
 */
interface PaginationSizeType {
  pageSize: number,
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

/**
 * PaginationActionsType
 *
 * Groups pagination filter and size settings.
 *
 * @property {PaginationFilterType} paginationFilterType - Pagination filter information.
 * @property {PaginationSizeType} paginationSizeType - Pagination size settings.
 */
interface PaginationActionsType {
  paginationFilterType: PaginationFilterType,
  paginationSizeType: PaginationSizeType,
}


/**
 * TriggerTableUpdateType
 *
 * Defines the trigger state for updating the product table.
 *
 * @property {boolean} shouldUpdateTable - Flag to indicate if the table should update.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShouldUpdateTable - Function to toggle the update state.
 */
interface TriggerTableUpdateType {
  shouldUpdateTable: boolean,
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * ToggleForCreateAndEditProduct
 *
 * Contains state and actions for toggling product creation and editing modals.
 *
 * @property {boolean} shouldOpenForm - Flag to indicate if the form modal should be open.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShouldOpenForm - Function to toggle the form modal.
 * @property {boolean} deleteConfirmation - Flag to indicate if the delete confirmation modal should be shown.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setDeleteConfirmation - Function to toggle delete confirmation.
 * @property {InventoryItem | null} item - The inventory item selected for editing.
 * @property {React.Dispatch<React.SetStateAction<InventoryItem | null>>} setItem - Function to set the selected item.
 */
interface ToggleForCreateAndEditProduct {
  shouldOpenForm: boolean,
  setShouldOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
  deleteConfirmation: boolean,
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
  item: InventoryItem | null,
  setItem: React.Dispatch<React.SetStateAction<InventoryItem | null>>
}

/**
 * InventoryItemsType
 *
 * Manages the state for inventory items.
 *
 * @property {InventoryItem[]} inventoryItems - Array of inventory items.
 * @property {React.Dispatch<React.SetStateAction<InventoryItem[]>>} setInventoryItems - Function to update the inventory items.
 */
interface InventoryItemsType {
  inventoryItems: InventoryItem[],
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>
}

/**
 * SortingContextType
 *
 * Defines the sorting state for inventory items.
 *
 * @property {string[]} sortBy - Array of field names to sort by.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} setSortBy - Function to update the sort fields.
 * @property {string[]} sortOrder - Array of sort orders corresponding to sortBy.
 * @property {React.Dispatch<React.SetStateAction<string[]>>} setSortOrder - Function to update the sort orders.
 */
interface SortingContextType {
  sortBy: string[];
  setSortBy: React.Dispatch<React.SetStateAction<string[]>>
  sortOrder: string[];
  setSortOrder: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * InventoryItemsOutOfStockType
 *
 * Manages the state for marking inventory items as out of stock.
 *
 * @property {boolean} markItemsConfirmation - Flag indicating whether marking items out of stock is confirmed.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setMarkItemsConfirmation - Function to update the confirmation state.
 */
interface InventoryItemsOutOfStockType {
  markItemsConfirmation: boolean,
  setMarkItemsConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * InventoryContextType
 *
 * Aggregates all context types for the inventory management system.
 *
 * @property {FilterContextType} filterContext - Context for filtering products.
 * @property {PaginationActionsType} paginationContext - Context for pagination settings.
 * @property {TriggerTableUpdateType} triggerTableUpdateType - Context to trigger table updates.
 * @property {ToggleForCreateAndEditProduct} toggleForCreateAndEditProduct - Context for toggling product creation/editing.
 * @property {InventoryItemsType} inventoryItems - Context for inventory items data.
 * @property {SortingContextType} sortingContext - Context for sorting the inventory.
 * @property {InventoryItemsOutOfStockType} inventoryItemsOutOfStockType - Context for handling out of stock confirmation.
 */
interface InventoryContextType {
  filterContext: FilterContextType
  paginationContext: PaginationActionsType
  triggerTableUpdateType: TriggerTableUpdateType
  toggleForCreateAndEditProduct: ToggleForCreateAndEditProduct
  inventoryItems: InventoryItemsType
  sortingContext: SortingContextType
  inventoryItemsOutOfStockType: InventoryItemsOutOfStockType
}


// Create the InventoryContext with a default value of null.
export const InventoryContext = createContext<InventoryContextType | null>(null)

/**
 * InventoryProvider Component
 *
 * Provides the InventoryContext to its children components.
 * It initializes the state for filtering, pagination, table updates,
 * product creation/editing, inventory items, sorting, and stock confirmation.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} The InventoryContext provider wrapping the children.
 *
 * @example
 * <InventoryProvider>
 *   <App />
 * </InventoryProvider>
 */
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
