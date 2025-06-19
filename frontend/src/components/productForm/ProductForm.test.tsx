import { screen } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import { render } from "../../utils/tests.utils" // Your custom render function
import ProductForm from "./ProductForm"
import { useProductForm } from "../../hooks/useProductForm"
import { StockStatus } from "../../utils/inventory.utils"
import { InventoryItem } from "../../types/inventory"

// ===================================================================================
// MOCKS SETUP
// ===================================================================================
vi.mock("../../hooks/useProductForm")

// A helper to easily access the mocked hook
const mockUseProductForm = vi.mocked(useProductForm)

// ===================================================================================
// TESTS
// ===================================================================================
describe("ProductForm", () => {
  // Before each test, reset the mock to a default "create" state.
  beforeEach(() => {
    mockUseProductForm.mockReturnValue({
      selectedName: "",
      errorName: false,
      error: null,
      isLoading: false,
      categories: ["Food", "Drinks"],
      isVisible: false,
      allProductsAreValid: true,
      selectedCategory: "",
      setSelectedCategory: vi.fn(),
      selectedStock: 10,
      setSelectedStock: vi.fn(),
      selectedUnitPrice: 0,
      setSelectedUnitPrice: vi.fn(),
      selectedDate: null,
      setSelectedDate: vi.fn(),
      handleSumbit: vi.fn(),
      handleChangeName: vi.fn(),
      handleNewCategoryButton: vi.fn(),
    })
  })

  test("should render the create form correctly", async () => {
    // Act
    render(<ProductForm productToEdit={null} onClose={vi.fn()} />)

    // Assert: that the main instruction text is visible.
    const instruction = await screen.findByText(/Please provide the required information/i)
    expect(instruction).toBeInTheDocument()

    // Assert: that key form elements are present.
    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  })

  test("should render the form with pre-filled data when editing", async () => {
    // Arrange: Create a mock product that will be "edited".
    const mockProduct: InventoryItem = {
      id: 1,
      product: {
        id: 1,
        name: "Test Product",
        category: "Food",
        price: 99,
        expiryDate: null,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
      quantity: 5,
      stockStatus: StockStatus.OUT_OF_STOCK,
    }

    // For this test, override the mock to return the data of the product to edit.
    mockUseProductForm.mockReturnValue({
      selectedName: mockProduct.product.name,
      selectedCategory: mockProduct.product.category,
      selectedStock: mockProduct.quantity,
      selectedUnitPrice: mockProduct.product.price,
      errorName: false,
      error: null,
      isLoading: false,
      categories: ["Food", "Drinks"],
      isVisible: false,
      allProductsAreValid: true,
      setSelectedCategory: vi.fn(),
      setSelectedStock: vi.fn(),
      setSelectedUnitPrice: vi.fn(),
      selectedDate: null,
      setSelectedDate: vi.fn(),
      handleSumbit: vi.fn(),
      handleChangeName: vi.fn(),
      handleNewCategoryButton: vi.fn(),
    })

    render(<ProductForm productToEdit={mockProduct} onClose={vi.fn()} />)

    // Assert: Check that the input field is pre-filled with the product's name.
    const nameField = await screen.findByDisplayValue("Test Product")
    expect(nameField).toBeInTheDocument()
  })
})
