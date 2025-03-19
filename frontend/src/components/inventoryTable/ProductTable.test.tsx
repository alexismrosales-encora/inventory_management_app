// ProductTable.test.tsx
import { render, screen } from "@testing-library/react";
vi.mock("../../services/inventory.service", () => {
  return {
    default: {
      getAllItems: vi.fn().mockResolvedValue({
        items: [],
        totalItems: 0
      }),
    }
  };
});
import { describe, test, expect, vi } from "vitest";
import { mockContextValue } from "../../mocks/inventory.context.mock"
import { InventoryContext } from "../../context/InventoryContext";
import ProductTable from "./ProductTable";



describe("ProductTable", () => {
  test("should render the table correctly", () => {
    render(
      <InventoryContext.Provider value={mockContextValue}>
        <ProductTable />
      </InventoryContext.Provider>
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("should render nothing if the context is null", () => {
    render(<ProductTable />);
    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();
  });
});

