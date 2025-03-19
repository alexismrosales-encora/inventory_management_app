// ProductForm.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../services/inventory.service", () => {
  return {
    default: {
      getCategories: vi.fn().mockResolvedValue(["Food", "Drinks"]),
      createInventoryItem: vi.fn().mockResolvedValue({}),
      updateInventoryItem: vi.fn().mockResolvedValue({}),
    },
  };
});

import ProductForm from "./ProductForm";
import { InventoryContext } from "../../context/InventoryContext";
import { InventoryItem } from "../../types/inventory";
import { StockStatus } from "../../utils/inventory.utils";

const mockContextValue = {
  triggerTableUpdateType: {
    shouldUpdateTable: false,
    setShouldUpdateTable: vi.fn(),
  },
};

describe("ProductForm", () => {
  test("should render the create form when productToEdit is null", async () => {
    render(
      <InventoryContext.Provider value={mockContextValue as any}>
        <ProductForm productToEdit={null} onClose={vi.fn()} />
      </InventoryContext.Provider>
    );

    const instruction = await screen.findByText(/Please provide the required information/i);
    expect(instruction).toBeInTheDocument();

    expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  test("should render the edition form when productToEdit is not null", async () => {
    const mockProduct: InventoryItem = {
      id: 1,
      product: {
        id: 1,
        name: "Test Product",
        category: "Electronics",
        price: 99,
        expiryDate: null,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
      quantity: 5,
      stockStatus: StockStatus.OUT_OF_STOCK,
    };

    render(
      <InventoryContext.Provider value={mockContextValue as any}>
        <ProductForm productToEdit={mockProduct} onClose={vi.fn()} />
      </InventoryContext.Provider>
    );

    const nameField = await screen.findByDisplayValue("Test Product");
    expect(nameField).toBeInTheDocument();
  });

  test("should render nothing if the context is null", () => {
    render(<ProductForm productToEdit={null} onClose={vi.fn()} />);
    const instruction = screen.queryByText(/Please provide the required information/i);
    expect(instruction).not.toBeInTheDocument();
  });
});

