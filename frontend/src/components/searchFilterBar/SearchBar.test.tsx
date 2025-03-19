
// SearchBar.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

vi.mock("../../services/inventory.service", () => {
  return {
    default: {
      getCategories: vi.fn().mockResolvedValue(["Category1", "Category2"]),
    },
  };
});

import SearchBar from "./SearchBar";
import { InventoryContext } from "../../context/InventoryContext";
import { mockContextValue } from "../../mocks/inventory.context.mock";

describe("SearchBar", () => {
  test("should render search input, new product button, availability select and category checkboxes", async () => {
    render(
      <InventoryContext.Provider value={mockContextValue}>
        <SearchBar />
      </InventoryContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Enter product name/i);
    expect(searchInput).toBeInTheDocument();

    const newProductButton = screen.getByRole("button", { name: /New product/i });
    expect(newProductButton).toBeInTheDocument();


    const categoryCheckbox = await screen.findByRole("checkbox", { name: /Category1/i });
    expect(categoryCheckbox).toBeInTheDocument();
  });
});

