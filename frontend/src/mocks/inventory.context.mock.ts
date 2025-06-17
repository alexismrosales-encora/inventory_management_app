import { vi } from "vitest";
import { InventoryContext } from '../context/InventoryContext';

const mockSetState = vi.fn();
export const mockContextValue = {
  filterContext: {
    filters: {
      search: "",
      categories: [],
      stockStatus: null,
    },
    setFilters: mockSetState,
  },
  paginationContext: {
    paginationFilterType: {
      currentPage: 1,
      setCurrentPage: mockSetState,
      totalItems: 0,
      setTotalItems: mockSetState,
    },
    paginationSizeType: {
      pageSize: 10,
      setPageSize: mockSetState,
    },
  },
  triggerTableUpdateType: {
    shouldUpdateTable: false,
    setShouldUpdateTable: mockSetState,
  },
  toggleForCreateAndEditProduct: {
    shouldOpenForm: false,
    setShouldOpenForm: mockSetState,
    deleteConfirmation: false,
    setDeleteConfirmation: mockSetState,
    item: null,
    setItem: mockSetState,
  },
  inventoryItems: {
    inventoryItems: [],
    setInventoryItems: mockSetState,
  },
  sortingContext: {
    sortBy: ["datecreated"],
    setSortBy: mockSetState,
    sortOrder: ["asc"],
    setSortOrder: mockSetState,
  },
  inventoryItemsOutOfStockType: {
    markItemsConfirmation: false,
    setMarkItemsConfirmation: mockSetState,
  },
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <InventoryContext.Provider value= { mockContextValue as any } >
  { children }
  </InventoryContext.Provider>
)
