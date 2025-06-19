import { screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import { render } from "../../utils/tests.utils" // Your custom render function
import MetricsTable from "./MetricsTable"
import { useMetricsData } from "../../hooks/useMetricsData"

// ===================================================================================
// MOCKS SETUP
// ===================================================================================

// 1. Mock the custom hook that the MetricsTable component uses.
vi.mock("../../hooks/useMetricsData")

const mockUseMetricsData = vi.mocked(useMetricsData)
// ===================================================================================
// TESTS
// ===================================================================================

describe("MetricsTable", () => {
  test("should render the loading state correctly", () => {
    // Arrange: Tell the mock hook to return a "loading" state
    mockUseMetricsData.mockReturnValue({
      metrics: null,
      isLoading: true,
      error: null,
    })

    // Act
    render(<MetricsTable />)

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("should render the error state correctly", () => {
    // Arrange: Tell the mock hook to return an "error" state
    mockUseMetricsData.mockReturnValue({
      metrics: null,
      isLoading: false,
      error: "Failed to load metrics.",
    })

    // Act
    render(<MetricsTable />)

    // Assert
    expect(screen.getByText("Error")).toBeInTheDocument()
  })

  test("should render the metrics data correctly", () => {
    // Arrange: Provide a complete mock data object for the successful state
    mockUseMetricsData.mockReturnValue({
      isLoading: false,
      error: null,
      metrics: {
        totalValueInStock: 1500,
        averagePriceInStock: 125,
        categoryMetrics: [
          {
            category: "Electronics",
            totalProductsInStock: 5,
            totalValueInStock: 1000,
            averagePriceInStock: 200,
          },
        ],
      },
    })

    // Act
    render(<MetricsTable />)

    // Assert: Check for key pieces of text from the mock data
    expect(screen.getByText("Overall")).toBeInTheDocument()
    expect(screen.getByText("1500")).toBeInTheDocument() // Check for total value
    expect(screen.getByText("Electronics")).toBeInTheDocument() // Check for category name
  })

  test("should render the empty state if metrics are null", () => {
    // Arrange: Simulate the initial state where metrics might be null
    mockUseMetricsData.mockReturnValue({
      metrics: null,
      isLoading: false,
      error: null,
    })

    // Act
    render(<MetricsTable />)

    // Assert
    expect(screen.getByText("Not metrics available yet")).toBeInTheDocument()
  })
})
