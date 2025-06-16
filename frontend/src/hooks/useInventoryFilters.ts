import { useContext, useEffect, useState } from "react"
import { InventoryContext } from "../context/InventoryContext"
import inventoryService from "../services/inventory.service";

export const useInventoryFilters = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventoryFilters must be used within an InventoryProvider');
  }

  // Hooks from context
  const { filters, setFilters } = context.filterContext

  // Local hooks
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        : [...prevFilters.categories, selectedCategory]

      return { ...prevFilters, categories: updatedCategories }
    })
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
    // Define an async function to fetch the data
    const fetchCategories = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await inventoryService.getCategories()
        setCategories(response)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
        setError("Could not load categories. Please refresh and try again.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return {
    filters,
    categories,
    error,
    isLoading,
    handleSearchTextChange,
    handleCategoryChange,
    handleStockStatusChange,
  }
}
