import { StockStatusList } from '../utils/inventory.utils'
const SearchBar = () => {
  const statusList = StockStatusList();
  return <div>
    <form>
      <label>
        Name:
        <input type="text" id="itemName" name="Name" defaultValue="Item name" />
      </label>
      <label>
        Category:
        <select>
        </select>
      </label>
      <label>
        Availability:
        <select>
          {statusList.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </label>
    </form>
  </div>
}

export default SearchBar
