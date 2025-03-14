import { useContext, useEffect, useState } from "react"
import { InventoryContext } from "../context/InventoryContext"
import ReactPaginate from "react-paginate";


export const PaginationBar = () => {
  const [currentPageState, setCurrentPageState] = useState<number>(0); // `react-paginate` usa índices desde 0
  const context = useContext(InventoryContext);

  if (!context) return null;

  const { totalItems, setCurrentPage } = context.paginationContext.paginationFilterType;
  const { pageSize } = context.paginationContext.paginationSizeType;

  const pageCount = Math.ceil(totalItems / pageSize); // Total de páginas

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPageState(selected);
    setCurrentPage(selected + 1); // Ajuste porque react-paginate usa índices base 0
  };

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
