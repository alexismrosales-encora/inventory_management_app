import { screen } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import { render } from "../../utils/tests.utils"
import ProductTable from "./ProductTable"

import { useInventoryData } from "../../context/InventoryDataContext"
import { useProductModal } from "../../context/ProductModalContext"
import { useConfirmations } from "../../context/ConfirmationContext"
import { useTableTrigger } from "../../context/TableTriggerContext"
import { useInventoryFilters } from "../../hooks/useInventoryFilters"
import { useInventoryItems } from "../../hooks/useInventoryItems"
import { useSorting } from "../../context/SortingContext"
import { StockStatus } from "../../utils/inventory.utils"

// ===================================================================================
// MOCKS SETUP
// ===================================================================================

// Mock the module for each hook at its correct file path.
vi.mock("../../context/InventoryDataContext")
vi.mock("../../context/ProductModalContext")
vi.mock("../../context/ConfirmationContext")
vi.mock("../../context/TableTriggerContext")
vi.mock("../../hooks/useInventoryFilters")
vi.mock("../../hooks/useInventoryItems")
vi.mock("../../context/SortingContext") // Mock the missing module

// Provide a default implementation for every mocked hook before each test.
beforeEach(() => {
  vi.mocked(useInventoryData).mockReturnValue({
    inventoryItems: [],
    setInventoryItems: vi.fn(),
  })
  vi.mocked(useProductModal).mockReturnValue({
    shouldOpenForm: false,
    setShouldOpenForm: vi.fn(),
    itemForAction: null,
    setItemForAction: vi.fn(),
  })
  vi.mocked(useConfirmations).mockReturnValue({
    deleteConfirmation: false,
    setDeleteConfirmation: vi.fn(),
    markItemsConfirmation: false,
    setMarkItemsConfirmation: vi.fn(),
  })
  vi.mocked(useTableTrigger).mockReturnValue({
    triggerUpdate: vi.fn(),
    shouldUpdateTable: false,
  })
  vi.mocked(useInventoryFilters).mockReturnValue({
    isLoading: false,
    error: null,
    filters: { search: '', categories: [], stockStatus: null },
    categories: [],
    handleSearchTextChange: vi.fn(),
    handleCategoryChange: vi.fn(),
    handleStockStatusChange: vi.fn(),
  })
  // FIX: This mock now also returns inventoryItems, as the child ProductRows needs it
  vi.mocked(useInventoryItems).mockReturnValue({
    inventoryItems: [],
    checkedItems: {},
    error: null,
    isLoading: false,
    handleEditButton: vi.fn(),
    handleDeleteButton: vi.fn(),
    handleUpdateStateButton: vi.fn(),
  })
  // FIX: Add a default mock for the missing useSorting hook
  vi.mocked(useSorting).mockReturnValue({
    sortBy: [],
    setSortBy: vi.fn(),
    sortOrder: [],
    setSortOrder: vi.fn(),
  })
})

// ===================================================================================
// TESTS
// ===================================================================================

describe("ProductTable", () => {
  test("should render 'No products found.' when inventory is empty", () => {
    // This test uses the default mocks where inventoryItems is empty
    render(<ProductTable />)
    expect(screen.getByText("No products found.")).toBeInTheDocument()
  })

  test("should render the table when inventory has items", () => {
    // Arrange: Override the hooks that provide data.
    const mockItems = [
      {
        id: 1,
        product: { id: 1, name: 'Milk', category: 'Dairy', price: 2.50, expiryDate: new Date(), dateCreated: new Date(), dateUpdated: new Date() },
        quantity: 50,
        stockStatus: StockStatus.IN_STOCK
      }
    ]

    // Both the parent and the child component need the item data
    vi.mocked(useInventoryData).mockReturnValue({ inventoryItems: mockItems, setInventoryItems: vi.fn() })
    vi.mocked(useInventoryItems).mockReturnValue({
      inventoryItems: mockItems,
      // a complete mock for the child to use
      checkedItems: { 1: false },
      error: null,
      isLoading: false,
      handleEditButton: vi.fn(),
      handleDeleteButton: vi.fn(),
      handleUpdateStateButton: vi.fn()
    })

    // Act
    render(<ProductTable />)

    // Assert
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
    expect(screen.getByText("Milk")).toBeInTheDocument()
  })
})
