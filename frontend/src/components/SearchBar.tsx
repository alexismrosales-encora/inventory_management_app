import { StockStatusList } from '../utils/inventory.utils'
import { InventoryContext } from '../context/InventoryContext'
import { useContext, useEffect, useState } from 'react';
import { BoardCheck, CategoryIcon, NavDownArrowIcon, SearchIcon } from './Icons.tsx'
import inventoryService from '../services/inventory.service';
import TablePageResizer from '../components/TablePageResizer'
import ShowProductForm from './ShowProductForm.tsx';
const SearchBar = () => {
  const [categoriesState, setCategoriesState] = useState<string[]>([])
  const statusList = StockStatusList()
  // using context
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }

  const { filters, setFilters } = context.filterContext;

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, categories: [e.target.value] })
  }

  const handleStockStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, stockStatus: e.target.value as any })
  }

  useEffect(() => {
    inventoryService.getCategories().then((response) => {
      setCategoriesState(response)
    })
  }, [categoriesState])

  return <div className="w-full py-4">
    <form>
      <div className="flex w-full items-center space-x-4">
        <label className="w-11/12">
          <div className="relative flex items-center w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg px-2 py-1">
            <SearchIcon />
            <input
              type="text"
              className="w-full pl-3 text-gray-700 placeholder:text-base"
              id="itemName"
              name="searchText"
              value={filters.search}
              onChange={handleSearchTextChange}
              placeholder="Enter product name..." />
          </div>
        </label>
        <div className="w-1/12 items-end">
          <ShowProductForm />
        </div>
      </div>
      <div className="pt-8 inline-flex space-x-1">
        <label>
          <div className="relative flex items-center max-w-md bg-gray-50 border border-gray-300 rounded-full px-2 py-1">
            {// TODO: fix this value 
            }
            <CategoryIcon />
            <select
              value={filters.categories[0]}
              onChange={handleCategoryChange}
              className="w-full appearance-none text-sm bg-gray-50 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="text-sm">Category</option>
              {categoriesState.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <NavDownArrowIcon color={"#899A50"} />
          </div>
        </label>
        <label>
          <div className="relative flex items-center max-w-md bg-gray-50 border border-gray-300 rounded-full px-2 py-1">
            <BoardCheck />
            <select
              value={filters.stockStatus ?? ""}
              onChange={handleStockStatusChange}
              className="w-full appearance-none text-sm bg-gray-50 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Availability</option>
              {statusList.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <NavDownArrowIcon color={"#899A50"} />
          </div>
        </label>
        <TablePageResizer className=" appearance-none text-sm bg-gray-50 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
    </form >
  </div >
}
export default SearchBar
