// SearchBar.test.tsx
import { screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import { render } from "../../utils/tests.utils"
import SearchBar from "./SearchBar"
import { useInventoryFilters } from "../../hooks/useInventoryFilters"

// ===================================================================================
// MOCKS SETUP
// ===================================================================================
vi.mock("../../hooks/useInventoryFilters")

// A helper to easily access the mocked hook
const mockUseInventoryFilters = vi.mocked(useInventoryFilters)

// ===================================================================================
// TESTS
// ===================================================================================
describe("SearchBar", () => {
  test("should render search input, new product button, and category checkboxes", async () => {
    // Arrange: Define the mock return value for the hook.
    // We provide sample categories so the component has something to render.
    mockUseInventoryFilters.mockReturnValue({
      filters: { search: '', categories: [], stockStatus: null },
      categories: ["Category1", "Category2"], // Provide mock categories
      isLoading: false,
      error: null,
      handleSearchTextChange: vi.fn(),
      handleCategoryChange: vi.fn(),
      handleStockStatusChange: vi.fn(),
    })

    // Act: Render the component. Our custom render function will wrap it
    // with all the necessary providers for any child components.
    render(<SearchBar />)

    // Assert: Check that all the key elements are rendered correctly.

    // Check for the search input
    const searchInput = screen.getByPlaceholderText(/Enter product name/i)
    expect(searchInput).toBeInTheDocument()

    // Check for the "New product" button
    const newProductButton = screen.getByRole("button", { name: /New product/i })
    expect(newProductButton).toBeInTheDocument()

    // Check for the category checkboxes. We use `findByRole` because the categories
    // might be rendered after a brief moment (if the hook were async).
    const categoryCheckbox = await screen.findByRole("checkbox", { name: /Category1/i })
    expect(categoryCheckbox).toBeInTheDocument()
  })
})

