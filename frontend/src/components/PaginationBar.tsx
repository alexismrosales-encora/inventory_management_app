import { useContext, useEffect, useState } from "react"
import { PaginationContext } from "../context/InventoryContext"

export const PaginationBar = () => {
  const [currentPageState, setCurrentPageState] = useState<number>(1)
  const [totalItemsArray, setTotalItemsArray] = useState<number[]>([])
  // Se necesita hacer el react context que pase el tamaño de la pagina de la tabla al pagination component
  const context = useContext(PaginationContext)
  if (!context) {
    return null
  }

  const { totalItems, setCurrentPage } = context.paginationFilterType
  const { pageSize } = context.paginationSizeType


  const handlePageButton = (pageNumber: number) => {
    setCurrentPageState(pageNumber)
  }

  useEffect(() => {
    setCurrentPageState(1)
  }, [totalItems])

  useEffect(() => {
    setCurrentPage(currentPageState)
  }, [currentPageState])

  useEffect(() => {
    setTotalItemsArray(Array.from({ length: Math.ceil(totalItems / pageSize) }, (_, i) => i + 1))
  }, [totalItems, pageSize])


  return <nav>
    {totalItemsArray.map((value, index) => (
      <button type="button" key={index} onClick={() => handlePageButton(value)}>{value}</button>
    ))}
  </nav>
}

export default PaginationBar
