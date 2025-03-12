import { useContext, useEffect, useState } from "react"
import inventoryService from "../services/inventory.service"
import { InventoryItem, Pagination } from "../types/inventory"
import { InventoryContext } from "../context/InventoryContext";
import { NavUpArrowIcon, NavDownArrowIcon } from "./Icons"



export const ProductRows = () => {

  const context = useContext(InventoryContext)
  const [totalItemsState, setTotalItemsState] = useState<number>(0);
  if (!context) {
    return null
  }

  const { filters } = context.filterContext
  const { currentPage, totalItems, setTotalItems } = context.paginationContext.paginationFilterType
  const { pageSize } = context.paginationContext.paginationSizeType
  const { shouldUpdateTable, setShouldUpdateTable } = context.triggerTableUpdateType
  const { setShouldOpenForm, setItem } = context.toggleForCreateAndEditProduct
  const { inventoryItems, setInventoryItems } = context.inventoryItems
  const { sortBy, sortOrder } = context.sortingContext;


  useEffect(() => {
    // TODO: Configure items for pagination inputs
    const pagination: Pagination = {
      page: currentPage,
      size: pageSize,
      sortBy,
      sortOrder
    }
    inventoryService.getAllItems(pagination, filters).then(
      (response) => {
        setInventoryItems(response.items)
        setTotalItemsState(response.totalItems)
      }
    )
  }, [filters, currentPage, pageSize, shouldUpdateTable, sortBy, sortOrder])

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
    <th>Category <UpDownButtons sortBy="category" /> </th>
    <th>Name <UpDownButtons sortBy="name" /> </th>
    <th>Price <UpDownButtons sortBy="price" /></th>
    <th>Expiration Date <UpDownButtons sortBy="expirydate" /></th>
    <th>Stock <UpDownButtons sortBy="stock" /></th>
    <th>Actions</th>
  </tr>
}

interface UpDownButtonsProps {
  sortBy: string;
}
const UpDownButtons = ({ sortBy }: UpDownButtonsProps) => {
  const context = useContext(InventoryContext)
  // TODO: Order by default by date created
  if (!context) {
    return null
  }
  const { sortOrder, setSortOrder, sortBy: currentSortBy, setSortBy } = context.sortingContext;
  const { setShouldUpdateTable } = context.triggerTableUpdateType;

  const handleNavArrowButton = () => {
    let newSortBy = [...currentSortBy]
    let newSortOrder = [...sortOrder]

    const index = newSortBy.indexOf(sortBy)

    if (index === -1) {
      // If the element is not in the list with max two columns
      if (newSortBy.length < 2) {
        newSortBy.push(sortBy)
        newSortOrder.push("asc") // Starting with asc
      }
    } else {
      // alternating with asc and desc
      newSortOrder[index] = newSortOrder[index] === "asc" ? "desc" : "asc";

      // if it was in desc, it is deleted (to deselect a column)
      if (newSortOrder[index] === "desc" && newSortBy.length === 2) {
        newSortBy.splice(index, 1);
        newSortOrder.splice(index, 1);
      }
    }
    setSortBy(newSortBy) // Field to order
    setSortOrder(newSortOrder) // update global context
    setShouldUpdateTable(prev => !prev) // Updating table
  }

  return <div>
    <button type="button" onClick={handleNavArrowButton}>
      <NavUpArrowIcon />
      <NavDownArrowIcon />
    </button>
  </div>
}
