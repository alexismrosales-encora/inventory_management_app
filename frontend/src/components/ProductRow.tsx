import { useEffect, useState } from "react"
import InventoryService from "../services/inventory.service"
import { InventoryItem } from "../types/inventory"

export const ProductRow = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  useEffect(() => {
    InventoryService.getAllItems().then(
      (response) => {
        setInventoryItems(response)
      }
    )
  })
  return <>
    {inventoryItems.map((item) => (
      <tr key={item.id}>
        <td>{item.product.category}</td>
        <td>{item.product.name}</td>
        <td>{item.product.price}</td>
        <td>{item.product.expiryDate.toString()}</td>
        <td>{item.quantity}</td>
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
