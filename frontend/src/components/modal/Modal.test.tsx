// Modal.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Modal from "./Modal";

describe("Modal", () => {
  test("should render title and content when isOpen is true", () => {
    render(
      <Modal
        isOpen={true}
        setIsOpen={vi.fn()}
        dialogTitle="Test title"
        dialogContent={<p>Test content</p>}
      />
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("should render nothing if isOpen is false", () => {
    render(
      <Modal
        isOpen={false}
        setIsOpen={vi.fn()}
        dialogTitle="Hidden title"
        dialogContent={<p>Hidden title</p>}
      />
    );

    expect(screen.queryByText("Hidden title")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });
});
