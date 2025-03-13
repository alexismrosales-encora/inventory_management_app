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
      <tr key={item.id} >
        <td className="py-5 px-2"></td>
        <td className="px-2">{item.product.category}</td>
        <td className="px-2 max-w-[3rem] truncate whitespace-nowrap overflow-hidden">{item.product.name}</td>
        <td className="px-2">{item.product.price}</td>
        <td className="px-2">{item.product.expiryDate ? item.product.expiryDate.toString() : "N/A"}</td>
        <td className="px-2">{item.quantity}</td>
        <td className="px-2">
          <button type="button" onClick={() => handleEditButton(item)}>Edit</button>
          <button type="button" onClick={() => handleDeleteButton(item.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </>
}

export const ProductRowHeader = () => {
  return <tr>
    <th className="px-4 py-2 align-bottom"></th>
    <th className="px-2 pt-2 align-bottom">
      <div className="flex items-end justify-between">
        <span className="font-medium pr-18">Category</span>
        <UpDownButtons sortBy="category" />
      </div>
    </th>
    <th className="px-2 pt-2 align-bottom">
      <div className="flex items-end justify-between">
        <span className="font-medium pr-40">Name</span>
        <UpDownButtons sortBy="name" />
      </div>
    </th>
    <th className="px-2 pt-2 align-bottom">
      <div className="flex items-end justify-center space-x-2">
        <span className="font-medium pr-18">Price</span>
        <UpDownButtons sortBy="price" />
      </div>
    </th>
    <th className="px-2 pt-2 alignt-bottom">
      <div className="flex items-end justify-center space-x-2">
        <span className="font-medium pr-15 whitespace-nowrap">Expiration Date</span>
        <UpDownButtons sortBy="expirydate" />
      </div>
    </th>
    <th className="px-2 pt-2 align-bottom">
      <div className="flex items-end justify-center space-x-2">
        <span className="font-medium pr-15">Stock</span>
        <UpDownButtons sortBy="stock" />
      </div>
    </th>
    <th className="px-2 pt-2 align-bottom">
      <span className="font-medium pr-15">Actions</span>
    </th>
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

  return <button type="button" onClick={handleNavArrowButton}>
    <NavUpArrowIcon />
    <NavDownArrowIcon />
  </button>
}
