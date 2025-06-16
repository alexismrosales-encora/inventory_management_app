import { useContext, useEffect, useState } from "react"
import { InventoryContext } from "../context/InventoryContext"
import inventoryService from "../services/inventory.service";
import { InventoryItem, Pagination } from "../types/inventory";
import { StockStatus } from "../utils/inventory.utils";

export const useInventoryItems = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventoryItems must be used within an InventoryProvider')
  }

  // Context hooks
  const { filters } = context.filterContext
  const { currentPage, totalItems, setTotalItems } = context.paginationContext.paginationFilterType
  const { pageSize } = context.paginationContext.paginationSizeType
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType
  const { setShouldOpenForm, setItem, setDeleteConfirmation } = context.toggleForCreateAndEditProduct
  const { inventoryItems, setInventoryItems } = context.inventoryItems
  const { sortBy, sortOrder } = context.sortingContext

  // Local hooks
  const [totalItemsState, setTotalItemsState] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  // Local hooks
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Update the total items in the global context whenever local inventory items or totalItemsState changes.
   */
  useEffect(() => {
    setTotalItems(totalItemsState)
  }, [inventoryItems, totalItemsState, totalItems])

  /**
    * Handles the click on the edit button for a given inventory item.
    *
    * @param {InventoryItem} item - The inventory item to edit.
    */
  const handleEditButton = (item: InventoryItem) => {
    setItem(item) // Pass form to the context
    setShouldOpenForm(true) // Trigger Form
  }

  /**
   * Handles the click on the delete button for a given inventory item.
   *
   * @param {InventoryItem} item - The inventory item to delete.
   */
  const handleDeleteButton = (item: InventoryItem) => {
    setItem(item)
    setDeleteConfirmation(true)
  }

  /**
   * Toggles the stock status of an item and updates the inventory.
   *
   * @param {number} id - The ID of the inventory item to update.
   */
  const handleUpdateStateButton = async (id: number) => {
    const isChecked = !checkedItems[id];;

    setCheckedItems((prev) => ({
      ...prev,
      [id]: isChecked
    }));

    try {
      if (isChecked) {
        await inventoryService.updateInventoryItemOutOfStock(id);
      } else {
        await inventoryService.updateInventoryItemInStock(id);
      }

      // trigger table update
      setShouldUpdateTable(prev => !prev);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }

  }

  // First, define a helper function outside your component to keep the logic separate
  const getInitialCheckedState = (items: InventoryItem[]): Record<number, boolean> => {
    return items.reduce((acc, item) => {
      acc[item.id] = item.stockStatus === StockStatus.OUT_OF_STOCK;
      return acc;
    }, {} as Record<number, boolean>);
  };

  /**
 * Fetch inventory items when filters, pagination, sorting, or update trigger changes.
 * Updates local inventory items state and total item count.
 * Also initializes the checked state based on each item's stock status.
 */
  useEffect(() => {
    // Define an async function inside the effect
    const fetchInventoryItems = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const pagination: Pagination = {
          page: currentPage,
          size: pageSize,
          sortBy,
          sortOrder
        }

        const response = await inventoryService.getAllItems(pagination, filters)

        setInventoryItems(response.items)
        setTotalItemsState(response.totalItems)
        setCheckedItems(getInitialCheckedState(response.items))

      } catch (error) {
        console.error("Failed to fetch inventory:", error)
        setError("Could not load inventory. Please try again.")
      } finally {
        setIsLoading(false)
      }
    };

    fetchInventoryItems();
  }, [filters, currentPage, pageSize, shouldUpdateTable, sortBy, sortOrder]);

  return {
    inventoryItems,
    checkedItems,
    error,
    isLoading,
    handleEditButton,
    handleDeleteButton,
    handleUpdateStateButton
  }

}
