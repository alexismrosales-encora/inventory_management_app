import { useContext, useEffect, useState } from "react"
import inventoryService from "../services/inventory.service"
import { InventoryItem, Product } from "../types/inventory";
import { StockStatus } from "../utils/inventory.utils";
import { InventoryContext } from "../context/InventoryContext";

interface ProductFormProps {
  productToEdit?: InventoryItem | null; // Optional prop for editing
  onClose: () => void; // Function to close the form
}

const ProductForm = ({ productToEdit, onClose }: ProductFormProps) => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType

  const [selectedName, setSelectedName] = useState(productToEdit?.product.name || "")
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(productToEdit?.product.category || "")
  const [selectedStock, setSelectedStock] = useState(productToEdit?.quantity || 10)
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(productToEdit?.product.price || 0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(productToEdit?.product.expiryDate ? productToEdit.product.expiryDate : null)

  useEffect(() => {
    inventoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [shouldUpdateTable])

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: productToEdit?.id || 0,
      name: selectedName,
      category: selectedCategory,
      price: selectedUnitPrice,
      expiryDate: selectedDate ? new Date(selectedDate) : null,
      dateCreated: new Date(),
      dateUpdated: new Date()
    }
    const inventory: InventoryItem = {
      id: productToEdit?.id || 0,
      product: product,
      quantity: selectedStock,
      stockStatus: StockStatus.IN_STOCK
    }

    if (productToEdit) {
      inventoryService.updateInventoryItem(inventory.id, inventory)
      console.log("Item sent as: ", inventory)
    } else {
      inventoryService.createInventoryItem(inventory)
    }
    // trigger table to update it
    setShouldUpdateTable(prev => !prev)
    onClose()
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
        <input type="text" name="newCategory" value={selectedCategory.toString()} onChange={(e) => setSelectedCategory(e.target.value)} />
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
        <input type="date" name="expirationDate" value={selectedDate ? selectedDate.toString() : "N/A"} onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)} />
      </label>
      <button type="submit" onClick={handleSumbit}>Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  </div>
}

export default ProductForm
