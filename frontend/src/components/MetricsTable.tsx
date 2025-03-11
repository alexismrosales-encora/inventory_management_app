import { useContext, useState, useEffect } from "react"
import { MetricsType } from "../types/inventory"
import inventoryService from "../services/inventory.service"
import { InventoryContext } from "../context/InventoryContext"

const MetricsTable = () => {
  const [metrics, setMetrics] = useState<MetricsType>({
    averagePriceInStock: 0,
    totalValueInStock: 0,
    categoryMetrics: []
  })

  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { shouldUpdateTable } = context.triggerTableUpdateType

  useEffect(() => {
    inventoryService.getMetrics().then(
      (response) => {
        setMetrics(response)
      }
    )
  }, [shouldUpdateTable])

  return <div>
    <h3>Overall</h3>
    <div>
      <h4>Total Value $</h4>
      <p>${metrics.totalValueInStock}</p>
    </div>
    <div>
      <h4> Average $</h4>
      <p>${metrics.averagePriceInStock}</p>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {metrics.categoryMetrics.map((value, index) => (
            <tr key={index}>
              <td>{value.category}</td>
              <td>{value.totalProductsInStock}</td>
              <td>{value.totalValueInStock}</td>
              <td>{value.averagePriceInStock}</td>
            </tr>
          ))}
        </tbody>
      </table>    </div>
  </div>
}

export default MetricsTable 
