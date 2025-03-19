import { useContext, useEffect, useState } from "react"
import inventoryService from "../../services/inventory.service"
import { InventoryItem, Pagination } from "../../types/inventory"
import { InventoryContext } from "../../context/InventoryContext";
import { NavUpArrowIcon, NavDownArrowIcon, EditProductIcon, DeleteProductIcon } from "../../utils/icons"
import { StockStatus } from "../../utils/inventory.utils";



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
  const { setShouldOpenForm, setItem, setDeleteConfirmation } = context.toggleForCreateAndEditProduct
  const { inventoryItems, setInventoryItems } = context.inventoryItems
  const { sortBy, sortOrder } = context.sortingContext

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
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

        // Mark items without stock
        const initialCheckedState = response.items.reduce((acc, item) => {
          acc[item.id] = item.stockStatus === StockStatus.OUT_OF_STOCK;
          return acc;
        }, {} as { [key: number]: boolean });
        setCheckedItems(initialCheckedState);
      }
    )
  }, [filters, currentPage, pageSize, shouldUpdateTable, sortBy, sortOrder])

  useEffect(() => {
    setTotalItems(totalItemsState)
  }, [inventoryItems, totalItemsState, totalItems])

  const handleEditButton = (item: InventoryItem) => {
    setItem(item) // Pass form to the context
    setShouldOpenForm(true) // Trigger Form
  }

  const handleDeleteButton = (item: InventoryItem) => {
    setItem(item)
    setDeleteConfirmation(true)
  }


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

  return <>
    {inventoryItems.map((item) => (
      <tr
        key={item.id}
        className={`${backgroundColorRows(item.product.expiryDate)} ${item.quantity <= 0 ? "relative line-through text-gray-500 border-b border-gray-500" : ""}`} >
        <td className="py-5 px-2">
          <button
            onClick={() => handleUpdateStateButton(item.id)}
            className={`px-2 py-1 rounded-lg transition text-xs ${checkedItems[item.id] ? "bg-accent-500 text-white" : "bg-primary-600 text-white"
              }`}
          >
            {checkedItems[item.id] ? "Out of Stock" : "In Stock"}
          </button>
        </td>
        <td className="px-2">{item.product.category}</td>
        <td className="px-2 max-w-[3rem] truncate whitespace-nowrap overflow-hidden">{item.product.name}</td>
        <td className="px-2">{item.product.price}</td>
        <td className="px-2">{item.product.expiryDate ? item.product.expiryDate.toString() : undefined}</td>
        <td className={"px-2 " + backgroundStockColorRows(item.quantity)}>{item.quantity}</td>
        <td className="px-2">
          <div className="space-x-4 flex flex-row justify-center items-center">
            <button
              type="button"
              className="border border-primary-500 rounded-lg p-1"
              onClick={() => handleEditButton(item)}>
              <EditProductIcon />
            </button>
            <button
              type="button"
              className="border border-primary-500 rounded-lg p-1"
              onClick={() => handleDeleteButton(item)}>
              <DeleteProductIcon />
            </button>
          </div>
        </td>
      </tr>
    ))}
  </>
}

export const ProductRowHeader = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { markItemsConfirmation, setMarkItemsConfirmation } = context.inventoryItemsOutOfStockType
  return <tr>
    <th className="px-2 pt-2 align-bottom">
      <label className="flex space-x-2 items-end justify-between h-full">
        <div className="items-center">
          <input
            type="checkbox"
            checked={markItemsConfirmation}
            onChange={() => setMarkItemsConfirmation(!markItemsConfirmation)}
            className="p-2 appearance-none border border-gray-300 rounded-full checked:bg-primary-500 checked:border-transparent focus:outline-none"
          />
        </div>
        <span className="font-medium flex items-center">All</span>
      </label>

    </th>
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

    if (index !== -1) {
      if (newSortOrder[index] === "desc") {
        newSortOrder[index] = "asc";
      } else if (newSortOrder[index] === "asc") {
        // if it is asc it means is the last state so it is deleted from the array
        newSortBy.splice(index, 1);
        newSortOrder.splice(index, 1);
      }
    } else {
      if (newSortBy.length === 2) {
        newSortBy.shift();
        newSortOrder.shift();
      }
      newSortBy.push(sortBy);
      newSortOrder.push("desc")
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

const backgroundColorRows = (itemExpiryDate: Date | null): string => {
  // If the items is null it means it has no expiryDate
  if (!itemExpiryDate) return "";

  const expiryDate = new Date(itemExpiryDate);
  const now = new Date();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;

  const timeDifference = expiryDate.getTime() - now.getTime();
  if (timeDifference <= oneWeek) {
    return "bg-red-100"; // Less than 7 days
  } else if (timeDifference <= twoWeeks) {
    return "bg-yellow-100"; // Between 7 and 14 days
  } else {
    return "bg-green-100"; // 14 days or more
  }
}

const backgroundStockColorRows = (stock: number): string => {
  if (stock < 5) {
    return "bg-red-400"
  } else if (stock >= 5 && stock <= 10) {
    return "bg-orange-300"
  }
  return ""
}




