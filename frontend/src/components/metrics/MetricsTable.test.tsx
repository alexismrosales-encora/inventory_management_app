// MetricsTable.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../services/inventory.service", () => {
  return {
    default: {
      getMetrics: vi.fn().mockResolvedValue({
        averagePriceInStock: 100,
        totalValueInStock: 1000,
        categoryMetrics: [
          {
            category: "Electronics",
            totalProductsInStock: 5,
            totalValueInStock: 500,
            averagePriceInStock: 100,
          },
        ],
      }),
    },
  };
});

import inventoryService from "../../services/inventory.service";
import MetricsTable from "./MetricsTable";

import { InventoryContext } from "../../context/InventoryContext";
import { mockContextValue } from "../../mocks/inventory.context.mock";


describe("MetricsTable", () => {
  test("should render 'Overall' if a context exists", async () => {
    render(
      <InventoryContext.Provider value={mockContextValue}>
        <MetricsTable />
      </InventoryContext.Provider>
    );

    const title = await screen.findByText(/overall/i);
    expect(title).toBeInTheDocument();

    expect(inventoryService.getMetrics).toHaveBeenCalledTimes(1);
  });

  test("should render nothing if context is null", () => {
    render(<MetricsTable />);
    const title = screen.queryByText(/overall/i);
    expect(title).not.toBeInTheDocument();
  });
});
