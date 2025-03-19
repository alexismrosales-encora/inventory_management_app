import { useContext } from 'react'
import { pageSizes } from '../../utils/inventory.utils'
import { InventoryContext } from '../../context/InventoryContext'


/**
 * TablePageResizer Component
 *
 * Renders a select dropdown that allows users to choose the number of items per page.
 * It retrieves the current page size and the setter function from the InventoryContext.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS class for styling the select element.
 * @returns {JSX.Element | null} The rendered select element, or null if InventoryContext is not available.
 */
interface TablePageResizerType {
  className?: string
}
const TablePageResizer = ({ className }: TablePageResizerType) => {
  const context = useContext(InventoryContext)
  if (!context) {
    return null
  }
  const { pageSize, setPageSize } = context.paginationContext.paginationSizeType

  /**
     * Handles changes in the select element for pagination size.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event triggered by the select input.
  */
  const handlePaginationSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(e.target.value as any)
  }

  return <select value={pageSize} onChange={handlePaginationSizeChange} className={className}>
    {pageSizes.map((value, index) => (
      <option key={index} value={value}>
        {value}/page
      </option>
    ))}
  </select>
}
export default TablePageResizer
