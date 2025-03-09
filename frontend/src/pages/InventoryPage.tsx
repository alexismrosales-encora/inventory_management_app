import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import InventoryTable from '../components/ProductTable'
import TablePageResizer from '../components/TablePageResizer'
import PaginationBar from '../components/PaginationBar'

import { FilterContext, PaginationActionsType, PaginationContext } from '../context/InventoryContext'
import { Filters } from '../types/inventory'
import { pageSizes } from '../utils/inventory.utils'

const Inventory = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    stockStatus: null
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizes[1])

  const pagination: PaginationActionsType = {
    paginationFilterType: {
      currentPage: currentPage,
      setCurrentPage: setCurrentPage,
      totalItems: totalItems,
      setTotalItems: setTotalItems
    },
    paginationSizeType: {
      pageSize: pageSize,
      setPageSize: setPageSize
    }
  }

  // Create context provider for the filter
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      <PaginationContext.Provider value={pagination}>
        <SearchBar />
        <InventoryTable />
        <TablePageResizer />
        <PaginationBar />
      </PaginationContext.Provider>
    </FilterContext.Provider >
  )
}

export default Inventory
