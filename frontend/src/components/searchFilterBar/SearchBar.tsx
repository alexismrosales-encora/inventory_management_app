import { StockStatusList } from '../../utils/inventory.utils'
import { InventoryContext } from '../../context/InventoryContext'
import React, { useContext, useEffect, useState } from 'react';
import { BoardCheck, CategoryIcon, NavDownArrowIcon, SearchIcon, NewProductIcon } from '../../utils/icons.tsx'
import inventoryService from '../../services/inventory.service';
import TablePageResizer from '../searchFilterBar/TablePageResizer.tsx'
import ProductForm from '../productForm/ProductForm.tsx';
import Modal from '../modal/Modal.tsx';

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
  const [categoriesState, setCategoriesState] = useState<string[]>([])

  const [openNewProductForm, setOpenNewProductForm] = useState(false)

  const statusList = StockStatusList()
  // using context
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }

  const { filters, setFilters } = context.filterContext;

  /**
   * Handle changes in the search input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the search input.
   */
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }


  /**
   * Handle changes in the category checkbox.
   *
   * Toggles the selected category in the filters.categories array.
   *
   * @param {string} selectedCategory - The category that was toggled.
   */
  const handleCategoryChange = (selectedCategory: string) => {
    setFilters((prevFilters) => {
      const updatedCategories = prevFilters.categories.includes(selectedCategory)
        ? prevFilters.categories.filter((cat) => cat !== selectedCategory)
        : [...prevFilters.categories, selectedCategory];

      return { ...prevFilters, categories: updatedCategories };
    });
  }


  /**
     * Handle changes in the stock status select element.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event from the select element.
  */
  const handleStockStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, stockStatus: e.target.value as any })
  }

  useEffect(() => {
    inventoryService.getCategories().then((response) => {
      setCategoriesState(response)
    })
  }, [categoriesState])

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
            {categoriesState.map((category) => (
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
