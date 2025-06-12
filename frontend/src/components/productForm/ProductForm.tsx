import { ProductFormProps } from "../../types/inventory"
import { PlusIcon } from "../../utils/icons"
import { useProductForm } from "../../hooks/useProductForm"


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

  const productFormHook = useProductForm({ productToEdit, onClose })

  const {
    selectedName,
    errorName,
    categories,
    isVisible,
    allProductsAreValid,

    selectedCategory, setSelectedCategory,
    selectedStock, setSelectedStock,
    selectedUnitPrice, setSelectedUnitPrice,
    selectedDate, setSelectedDate,

    handleSumbit,
    handleChangeName,
    handleNewCategoryButton
  } = productFormHook

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
