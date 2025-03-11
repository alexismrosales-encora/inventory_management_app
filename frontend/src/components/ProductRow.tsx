import { useContext, useEffect, useState } from "react"
import inventoryService from "../services/inventory.service"
import { InventoryItem, Pagination } from "../types/inventory"
import { InventoryContext } from "../context/InventoryContext";

export const ProductRows = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [totalItemsState, setTotalItemsState] = useState<number>(0);


  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }

  const { filters } = context.filterContext
  const { currentPage, totalItems, setTotalItems } = context.paginationContext.paginationFilterType
  const { pageSize } = context.paginationContext.paginationSizeType
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType
  const { setShouldOpenForm, setItem } = context.toggleForCreateAndEditProduct


  useEffect(() => {
    // TODO: Configure items for pagination inputs
    const pagination: Pagination = {
      page: currentPage,
      size: pageSize,
      sortBy: 'price',
      sortOrder: 'desc'
    }
    inventoryService.getAllItems(pagination, filters).then(
      (response) => {
        setInventoryItems(response.items)
        setTotalItemsState(response.totalItems)
      }
    )
  }, [filters, currentPage, pageSize, shouldUpdateTable])

  useEffect(() => {
    setTotalItems(totalItemsState)
  }, [inventoryItems, totalItemsState, totalItems])

  const handleEditButton = (item: InventoryItem) => {
    setShouldOpenForm(true) // Trigger Form
    setItem(item) // Pass form to the context
  }

  const handleDeleteButton = (id: number) => {
    setShouldUpdateTable(true) // Trigger update
    inventoryService.deleteInventoryItem(id) // Delete item
  }

  return <>
    {inventoryItems.map((item) => (
      <tr key={item.id}>
        <td>{item.product.category}</td>
        <td>{item.product.name}</td>
        <td>{item.product.price}</td>
        <td>{item.product.expiryDate ? item.product.expiryDate.toString() : "N/A"}</td>
        <td>{item.quantity}</td>
        <td>
          <button type="button" onClick={() => handleEditButton(item)}>Edit</button>
          <button type="button" onClick={() => handleDeleteButton(item.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </>
}

export const ProductRowHeader = () => {
  return <tr>
    <th>Category</th>
    <th>Name</th>
    <th>Price</th>
    <th>Expiration Date</th>
    <th>Stock</th>
    <th>Actions</th>
  </tr>
}
