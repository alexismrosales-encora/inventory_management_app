import { useContext } from 'react'
import { pageSizes } from '../utils/inventory.utils'
import { InventoryContext } from '../context/InventoryContext'

const TablePageResizer = () => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { pageSize, setPageSize } = context.paginationContext.paginationSizeType

  const handlePaginationSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(e.target.value as any)
  }

  return <select value={pageSize} onChange={handlePaginationSizeChange}>
    {pageSizes.map((value, index) => (
      <option key={index} value={value}>
        {value} / page
      </option>
    ))}
  </select>
}
export default TablePageResizer
