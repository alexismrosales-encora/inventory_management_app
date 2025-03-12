import { StockStatusList } from '../utils/inventory.utils'
import { InventoryContext } from '../context/InventoryContext'
import { useContext, useEffect, useState } from 'react';
import inventoryService from '../services/inventory.service';
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

  return <div>
    <form>
      <label>
        Search and item:
        <input type="text" id="itemName" name="searchText" value={filters.search} onChange={handleSearchTextChange} />
      </label>

      <label>
        Category:
        {// TODO: fix this value 
        }
        <select value={filters.categories[0]} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categoriesState.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </label>
      <label>
        Availability:
        <select value={filters.stockStatus ?? ""} onChange={handleStockStatusChange}>
          <option value="">All</option>
          {statusList.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>
    </form>
  </div>
}
export default SearchBar
