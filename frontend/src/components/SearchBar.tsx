import { StockStatusList } from '../utils/inventory.utils'
import { FilterContext } from '../context/InventoryContext'
import { useContext, useEffect, useState } from 'react';
import inventoryService from '../services/inventory.service';
const SearchBar = () => {
  const [categoriesState, setCategoriesState] = useState<string[]>([])
  const statusList = StockStatusList()
  // using context
  const context = useContext(FilterContext)
  if (!context) {
    return null
  }

  const { filters, setFilters } = context;

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value })
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
        <input type="text" id="itemName" name="SearchText" value={filters.search} onChange={handleSearchTextChange} />
      </label>

      <label>
        Category:
        <select value={filters.category} onChange={handleCategoryChange}>
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
