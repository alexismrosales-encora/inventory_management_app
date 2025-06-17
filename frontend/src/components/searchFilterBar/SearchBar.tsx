import { StockStatusList } from '../../utils/inventory.utils'
import { useState } from 'react';
import { BoardCheck, CategoryIcon, NavDownArrowIcon, SearchIcon, NewProductIcon } from '../../utils/icons.tsx'
import TablePageResizer from '../searchFilterBar/TablePageResizer.tsx'
import ProductForm from '../productForm/ProductForm.tsx';
import Modal from '../modal/Modal.tsx';
import { useInventoryFilters } from '../../hooks/useInventoryFilters.ts';

/**
 * SearchBar component
 *
 * This component provides a search and filter interface for the inventory.
 * It allows users to search by product name, filter by stock availability,
 * and select product categories. It also provides a button to open a modal
 * for creating a new product.
 *
 * @component
 * @example
 * return (
 *   <SearchBar />
 * )
 */
const SearchBar = () => {

  const [openNewProductForm, setOpenNewProductForm] = useState(false)

  const statusList = StockStatusList()
  const {
    filters,
    categories,
    handleSearchTextChange,
    handleCategoryChange,
    handleStockStatusChange
  } = useInventoryFilters()

  return <div className="w-full py-4">
    <form className="w-full flex-col">
      <div className="flex flex-row w-full items-center space-x-4">
        <label className="w-full flex-1">
          <div className="relative flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg px-2 py-1">
            <SearchIcon />
            <input
              type="text"
              className="w-full text-gray-700 placeholder:text-base"
              id="itemName"
              name="searchText"
              value={filters.search}
              onChange={handleSearchTextChange}
              placeholder="Enter product name..." />
          </div>
        </label>
        <div className="w-auto flex justify-end">
          <button
            type="button"
            className="bg-accent-500 p-2 md:w-full justify-center rounded-xl inline-flex items-center" onClick={() => setOpenNewProductForm(true)}>
            <NewProductIcon /> <span className="ml-2 hidden md:flex md:text-md md:font-semibold text-sm text-accent-800 whitespace-nowrap">New product</span>
          </button>
          <Modal
            isOpen={openNewProductForm}
            setIsOpen={setOpenNewProductForm}
            dialogTitle={"Create new product"}
            dialogContent={
              <ProductForm onClose={() => setOpenNewProductForm(false)} />}
          />
        </div>
      </div>
      <div className="pt-8 w-full flex-col space-y-2 justify-between p-2">
        <div className="flex flex-row">
          <label>
            <div className="relative w-full flex items-center bg-gray-50 border border-gray-300 rounded-full px-2 py-1">
              <BoardCheck />
              <select
                value={filters.stockStatus ?? ""}
                onChange={handleStockStatusChange}
                className="w-full appearance-none text-sm bg-gray-50 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none">
                <option value="">Availability</option>
                {statusList.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <NavDownArrowIcon color={"#899A50"} />
            </div>
          </label>

          <TablePageResizer className=" appearance-none text-sm bg-gray-50 rounded-lg px-3 text-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none" />

        </div>

        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-full p-2">
          <span className="pr-2">
            <CategoryIcon />
          </span>
          <div className="flex flex-wrap w-full gap-2  gap-x-2 gap-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={filters.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-4 h-4 appearance-none border border-gray-300 rounded-full checked:bg-primary-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </form >
  </div >
}

export default SearchBar
