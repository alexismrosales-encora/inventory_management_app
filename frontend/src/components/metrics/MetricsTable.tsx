import { useContext, useState, useEffect } from "react"
import { MetricsType } from "../../types/inventory"
import inventoryService from "../../services/inventory.service"
import { InventoryContext } from "../../context/InventoryContext"
import { DollarIcon } from "../../utils/icons"

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

  return <div className="pt-5 md:px-[15rem] w-full">
    <h3 className="font-medium text-2xl">Overall</h3>
    <div className="flex w-full py-4 justify-center">
      <CardTotal className="bg-accent-50 border border-accent-200 mr-2 " className2="bg-accent-200" text="Total value in stock" value={metrics.totalValueInStock} />
      <CardTotal className="bg-primary-50 border border-primary-200 ml-2" className2="bg-primary-200" text="Average price in stock" value={metrics.averagePriceInStock} />
    </div>
    <div className="w-full">
      {metrics.categoryMetrics.map((value, index) => (
        <div key={index} className="py-4">
          <h5>{value.category}</h5>
          <div className=" border-b border-b-gray-700">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-700">In Stock</span>
                <span className="text-gray-900 text-base">{value.totalProductsInStock}</span>
              </div>
              <div className="grid grid-rows-2 col-span-2">
                <div className="flex justify-between w-full">
                  <span className="text-xs text-gray-400">Total value in stock</span>
                  <span className="text-gray-900 text-sm inline-flex"><DollarIcon width={16} height={16} /> {value.totalValueInStock}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="text-xs text-gray-400">Average price in stock</span>
                  <span className="text-gray-900 text-sm inline-flex"><DollarIcon width={16} height={16} />{value.averagePriceInStock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
}

interface cardTotal {
  className: string,
  className2: string,
  text: string,
  value: number,
}

const CardTotal = ({ className, className2, text, value }: cardTotal) => {
  return <div className={className + " p-2 md:py-20  shadow-md rounded-lg inline-flex items-center space-x-4  flex-grow"}>
    <div className={className2 + " rounded-full"}>
      <DollarIcon />
    </div>
    <div>
      <h4 className="text-xs md:text-lg">{text}</h4>
      <p className="text-2xl font-normal">{value}</p>
    </div>
  </div>
}

export default MetricsTable 
