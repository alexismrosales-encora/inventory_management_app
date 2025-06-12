import { useContext, useEffect, useState } from "react"
import { InventoryContext } from "../context/InventoryContext"
import { InventoryItem, Product, ProductFormProps } from "../types/inventory"
import inventoryService from "../services/inventory.service"
import { StockStatus } from "../utils/inventory.utils"

export const useProductForm = ({ productToEdit, onClose }: ProductFormProps) => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useProductForm must be used within an InventoryProvider')
  }

  // Context hooks
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType

  // Local hooks
  const [selectedName, setSelectedName] = useState(productToEdit?.product.name || "")
  const [errorName, setErrorName] = useState(false)
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(productToEdit?.product.category || "")
  const [selectedStock, setSelectedStock] = useState(productToEdit?.quantity || 10)
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(productToEdit?.product.price || 0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(productToEdit?.product.expiryDate ? new Date(productToEdit.product.expiryDate) : null)
  const [isVisible, setIsVisible] = useState(false)
  const [allProductsAreValid, setAllProductsAreValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validCharacters = /^[A-Za-z0-9 ]*$/

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

  /**
 * Fetches the list of product categories from the inventory service.
 * The categories are updated whenever `shouldUpdateTable` changes.
 */
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await inventoryService.getCategories();
        setCategories(response);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Could not load categories.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [shouldUpdateTable])

  return {
    selectedName,
    errorName,
    error,
    isLoading,
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
  }
}
