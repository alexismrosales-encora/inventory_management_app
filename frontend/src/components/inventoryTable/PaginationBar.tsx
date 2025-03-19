import { useContext, useEffect, useState } from "react"
import { InventoryContext } from "../../context/InventoryContext"
import ReactPaginate from "react-paginate";


/**
 * PaginationBar Component
 *
 * Renders a pagination control using the "react-paginate" library.
 * It calculates the total number of pages based on the total items and page size provided
 * by the InventoryContext. It handles page changes and resets the pagination state when the total items change.
 *
 * @component
 * @example
 * return (
 *   <PaginationBar />
 * )
 */
export const PaginationBar = () => {
  const [currentPageState, setCurrentPageState] = useState<number>(0);
  const context = useContext(InventoryContext);

  if (!context) return null;

  const { totalItems, setCurrentPage } = context.paginationContext.paginationFilterType;
  const { pageSize } = context.paginationContext.paginationSizeType;


  // Calculate the total number of pages
  const pageCount = Math.ceil(totalItems / pageSize);

  /**
   * Handles page change events from react-paginate.
   *
   * @param {Object} param0 - An object containing the selected page index.
   * @param {number} param0.selected - The selected page index (0-based).
   */
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPageState(selected);
    setCurrentPage(selected + 1); // Adjusting because is zero-indexed
  };


  // Reset the local page state to 0 when the total number of items changes.
  useEffect(() => {
    setCurrentPageState(0);
  }, [totalItems]);

  return (
    <nav className="flex justify-center mt-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPageState > Math.max(1, Math.ceil(totalItems / pageSize)) - 1 ? 0 : currentPageState}
        containerClassName="flex items-center space-x-2 text-sm text-primary-700"
        pageClassName="px-3 py-2 rounded-lg bg-primary-100 md:text-sm text-xs cursor-pointer hover:bg-primary-200 transition"
        activeClassName="bg-primary-300"
        nextClassName="px-3 py-2 md:text-sm text-xs rounded-lg text-primary-600 bg-primary-100 cursor-pointer hover:bg-primary-200"
        previousClassName="px-3 py-2 md:text-sm text-xs rounded-lg text-primary-600 bg-primary-100 cursor-pointer hover:bg-primary-200"
      />
    </nav>
  );
};

export default PaginationBar
