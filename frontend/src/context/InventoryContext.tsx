import React, { createContext, useState } from 'react'
import { Filters } from '../types/inventory'
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

interface InventoryContextType {
  filterContext: FilterContextType,
  paginationContext: PaginationActionsType
}
export const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    stockStatus: null,
  });

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[1]);

  const filterContext: FilterContextType = {
    filters,
    setFilters,
  };

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
  };

  return (
    <InventoryContext.Provider value={{ filterContext, paginationContext }}>
      {children}
    </InventoryContext.Provider>
  )
}
