import { useEffect, useState } from "react"
import inventoryService from "../services/inventory.service"
import { InventoryItem, Product } from "../types/inventory";
import { StockStatus } from "../utils/inventory.utils";

const ProductForm = () => {
  const [selectedName, setSelectedName] = useState("")
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStock, setSelectedStock] = useState(10)
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0)
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    inventoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [])

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: 0,
      name: selectedName,
      category: selectedCategory,
      price: selectedUnitPrice,
      expiryDate: new Date(selectedDate),
      dateCreated: new Date(),
      dateUpdated: new Date()
    }
    const inventory: InventoryItem = {
      id: 0,
      product: product,
      quantity: selectedStock,
      stockStatus: StockStatus.IN_STOCK
    }
    inventoryService.createInventoryItem(inventory)
  }

  return <div>
    <form>
      <label>
        Name
        <input type="text" name="itemName" value={selectedName} onChange={(e) => setSelectedName(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="button"> New category </button>
        <input type="text" name="newCategory" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
      </label>
      <label>
        Stock
        <input type="text" name="stock" value={selectedStock} onChange={(e) => setSelectedStock(Number(e.target.value))} />
      </label>
      <label>
        Unit Price
        <input type="text" name="unitPrice" value={selectedUnitPrice} onChange={(e) => setSelectedUnitPrice(Number(e.target.value))} />
      </label>
      <label>
        Expiration Date
        <input type="date" name="expirationDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSumbit}>Save</button>
      <button type="button">Cancel</button>
    </form>
  </div>
}

export default ProductForm
