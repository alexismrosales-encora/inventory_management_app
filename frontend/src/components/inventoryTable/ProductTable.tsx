import { useContext } from 'react'
import { ProductRowHeader, ProductRows } from './ProductRow'
import { InventoryContext } from '../../context/InventoryContext'

import Modal from "../modal/Modal";

import ProductForm from "../productForm/ProductForm";
import inventoryService from '../../services/inventory.service';

/**
 * ProductTable Component
 *
 * Renders a table displaying products and integrates modals for product creation/editing,
 * deletion confirmation, and marking items out of stock. It uses InventoryContext to obtain
 * the necessary state and functions to manage modal visibility and trigger updates.
 *
 * @component
 * @example
 * return (
 *   <ProductTable />
 * )
 */
const ProductTable = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { shouldOpenForm,
    setShouldOpenForm,
    item,
    deleteConfirmation,
    setDeleteConfirmation } = context.toggleForCreateAndEditProduct
  const { setShouldUpdateTable } = context.triggerTableUpdateType
  const { markItemsConfirmation, setMarkItemsConfirmation } = context.inventoryItemsOutOfStockType
  const { inventoryItems } = context.inventoryItems



  /**
   * Handles the deletion of a product.
   *
   * Calls the inventory service to delete the item by id, triggers a table update, and
   * opens the delete confirmation modal.
   *
   * @param {number} id - The ID of the product to be deleted.
   */
  const handleDeleteButton = (id: number) => {
    inventoryService.deleteInventoryItem(id) // Delete item
    setShouldUpdateTable(prev => !prev) // Trigger update
    setDeleteConfirmation(true)
  }

  /**
   * Handles marking all products on the page as out of stock.
   *
   * Iterates over the inventory items and updates each one to be out of stock, then triggers
   * a table update.
   */
  const handleMarkItems = () => {
    inventoryItems.map((item) => {
      inventoryService.updateInventoryItemOutOfStock(item.id)
    })
    setShouldUpdateTable(prev => !prev) // Trigger update of the product table
  }

  return <> <div className="relative overflow-x-auto xl:overflow-visible">
    <div className="text-lg md:w-7/12 sm:w-full">
      <table className="table-auto border-collapse w-full text-gray-900">
        <thead className="border-b-2 border-primary-500">
          <ProductRowHeader />
        </thead>
        <tbody>
          <ProductRows />
        </tbody>
      </table>
    </div>
  </div>
    <Modal
      isOpen={shouldOpenForm}
      setIsOpen={setShouldOpenForm}
      dialogTitle={item ? "Edit product" : "Create new product"}
      dialogContent={
        <ProductForm
          productToEdit={item}
          onClose={() => setShouldOpenForm(false)}
        />}
    />

    <Modal
      isOpen={deleteConfirmation}
      setIsOpen={setDeleteConfirmation}
      dialogTitle="Delete product"
      dialogContent={
        <WarningConfirmation
          mainText="Are you sure you want to delete this inventory item?"
          arg={item?.id || 0}
          handleFunction={handleDeleteButton}
          onClose={() => setDeleteConfirmation(false)}
        />
      }
    />
    <Modal
      isOpen={markItemsConfirmation}
      setIsOpen={setMarkItemsConfirmation}
      dialogTitle="Mark items out of stock"
      dialogContent={
        <WarningConfirmation
          mainText="Are you sure you want to mark all the items of the page out of stock?"
          arg={0}
          handleFunction={handleMarkItems}
          onClose={() => setMarkItemsConfirmation(false)}
        />
      }
    />
  </>
}

interface WarningConfirmationInterface {
  mainText: string,
  arg: any,
  handleFunction: (arg: any) => void,
  onClose: () => void,
}

const WarningConfirmation = ({ mainText, arg, handleFunction, onClose }: WarningConfirmationInterface) => {
  return (
    <div className="flex flex-col space-y-4 text-center">
      <span className="text-lg">{mainText}</span>
      <span className="text-sm text-red-400">Warning: This action cannot be undone</span>
      <div className="flex flex-row justify-between">
        <button
          type="button"
          className="py-2 w-full bg-accent-500 rounded-lg hover:text-white transition-color duration-300 font-semibold"
          onClick={() => {
            handleFunction(arg) // run function
            onClose() // close form
          }}>Yes</button>
        <button
          type="button"
          className="py-2 w-full text-primary-600 font-semibold"
          onClick={() => onClose()}>No</button>
      </div>
    </div>
  )
}

export default ProductTable


