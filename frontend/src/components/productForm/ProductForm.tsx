import { useContext, useEffect, useState } from "react"
import inventoryService from "../../services/inventory.service"
import { InventoryItem, Product } from "../../types/inventory";
import { StockStatus } from "../../utils/inventory.utils";
import { InventoryContext } from "../../context/InventoryContext";
import { PlusIcon } from "../../utils/icons";

/**
 * Props for the ProductForm component.
 *
 * @typedef {Object} ProductFormProps
 * @property {InventoryItem | null} [productToEdit] - Optional product to edit; if null, the form is for creating a new product.
 * @property {() => void} onClose - Function to call when closing the form.
 */
interface ProductFormProps {
  productToEdit?: InventoryItem | null; // Optional prop for editing
  onClose: () => void; // Function to close the form
}

/**
 * ProductForm Component
 *
 * Renders a form to create or edit a product in the inventory. The form allows the user to input:
 * - Product name
 * - Category (select from existing categories or create a new one)
 * - Stock quantity
 * - Unit price
 * - Expiration date
 *
 * On submission, the form validates the inputs and calls either an update or create method from the inventory service.
 *
 * @component
 * @param {ProductFormProps} props - Component props.
 * @returns {JSX.Element | null} The rendered form or null if InventoryContext is unavailable.
 *
 * @example
 * return (
 *   <ProductForm productToEdit={null} onClose={handleClose} />
 * )
 */
const ProductForm = ({ productToEdit, onClose }: ProductFormProps) => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const validCharacters = /^[A-Za-z0-9 ]*$/

  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType

  const [selectedName, setSelectedName] = useState(productToEdit?.product.name || "")
  const [errorName, setErrorName] = useState(false)
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(productToEdit?.product.category || "")
  const [selectedStock, setSelectedStock] = useState(productToEdit?.quantity || 10)
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(productToEdit?.product.price || 0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(productToEdit?.product.expiryDate ? new Date(productToEdit.product.expiryDate) : null)
  const [isVisible, setIsVisible] = useState(false)
  const [allProductsAreValid, setAllProductsAreValid] = useState(true)

  /**
  * Fetches the list of product categories from the inventory service.
  * The categories are updated whenever `shouldUpdateTable` changes.
  */
  useEffect(() => {
    inventoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [shouldUpdateTable])
  /**
  * Handles form submission.
  *
  * Validates that required fields are provided and calls the appropriate
  * inventory service method to either update an existing product or create a new one.
  * Triggers a table update and closes the form if successful.
  *
  * @param {React.FormEvent} e - The form submission event.
  */
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedName !== "" && selectedCategory !== "" && selectedStock !== 0 && selectedUnitPrice !== 0 && errorName === false) {
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

      // Call the corresponding service method based on edit or creation mode
      if (productToEdit) {
        inventoryService.updateInventoryItem(inventory.id, inventory)
        console.log("Item sent as: ", inventory)
      } else {
        inventoryService.createInventoryItem(inventory)
      }
      // Trigger table update and close the form
      setShouldUpdateTable(prev => !prev)
      onClose()
    } else {
      setAllProductsAreValid(false)
    }
  }

  /**
  * Toggles the visibility of the new category input.
  */
  const handleNewCategoryButton = () => {
    setIsVisible(prev => !prev)
  }
  /**
  * Handles changes in the product name input.
  *
  * Validates that the input contains only allowed characters.
  *
  * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the product name input.
  */
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value)
    if (!validCharacters.test(selectedName)) {
      setErrorName(true)
    } else {
      setErrorName(false)
    }
  }

  return <div>
    <p className="text-sm text-gray-600 font-light text-justify pb-2">Please provide the required information to register a new product.</p>
    <form className="flex flex-col text-md space-y-4">
      <label className="flex flex-col space-y-2">
        <span className="font-semibold">Product name</span>
        <input
          type="text"
          className={`border border-gray-200 rounded-lg p-2 text-sm placeHolder:text-gray-500`}
          placeholder="e.g. Chocolate Cookies"
          name="itemName"
          value={selectedName}
          onChange={(e) => handleChangeName(e)} />
        {errorName && <span className="text-sm text-red-500">
          Only letters (A-Z, a-z) and numbers are allowed.
        </span>}
      </label>
      <label className="flex flex-col space-y-2">
        <span className="font-semibold">Category</span>
        <select
          className="border border-gray-200 rounded-lg p-2 text-sm text-gray-600 disabled:text-gray-300 disabled:bg-gray-50"
          value={selectedCategory}
          disabled={isVisible}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="" disabled selected hidden>
            Select an existing category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}

        </select>
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => handleNewCategoryButton()}
            className={`w-2/5 p-2 px-2 rounded-lg text-xs text-primary-600 inline-flex space-x-2 items-center ${isVisible && "bg-primary-200"}`}>
            <PlusIcon />
            <span>Create new category</span>
          </button>
          <input
            type="text"
            name="newCategory"
            hidden={!isVisible}
            placeholder="Create a new category"
            value={selectedCategory.toString()}
            className="border border-gray-200 rounded-lg p-2 text-sm placeHolder:text-gray-500"
            onChange={(e) => setSelectedCategory(e.target.value)} />
        </div>
      </label>
      <div className="flex flex-row justify-between gap-4">
        <label className="flex flex-1 flex-col space-y-2">
          <span className="font-semibold">Stock</span>
          <input
            type="number"
            className="border border-gray-200 rounded-lg p-2 text-sm placeHolder:text-gray-500"
            step="1"
            name="stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value ? parseInt(e.target.value, 10) : 0)} />
        </label>
        <label className="flex flex-1 flex-col space-y-2">
          <span className="font-semibold">Unit Price</span>
          <input
            type="number"
            className="border border-gray-200 rounded-lg p-2 text-sm placeHolder:text-gray-500"
            step="0.01"
            name="unitPrice"
            value={selectedUnitPrice}
            onChange={(e) => setSelectedUnitPrice(e.target.value ? parseFloat(e.target.value) : 0)} />
        </label>
      </div>
      <label className="flex flex-col space-y-2">
        <span className="font-semibold">Expiration Date</span>
        <input
          type="date"
          className="border border-gray-200 rounded-lg p-2 text-sm text-gray-500"
          name="expirationDate"
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          min={minDate}
          onChange={(e) => {
            const value = e.target.value
            setSelectedDate(value ? new Date(value + 'T00:00:00') : null)
          }} />
      </label>
      <span className="text-red-500 text-sm">{!allProductsAreValid ? "Some fields contain errors. Please review and try again." : ""}</span>
      <div className="flex flex-row justify-between gap-4 items-center">
        <button
          className="flex flex-1 py-2 text-accent-900 rounded-lg justify-center bg-accent-500 font-semibold hover:text-white transition-colors duration-300"
          type="submit"
          onClick={handleSumbit}>Save</button>
        <button className="flex flex-1 justify-center" type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  </div>
}

export default ProductForm
