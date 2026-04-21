import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SearchModal from "./search_modal";
import "@testing-library/jest-dom";

// 1. Updated Mock: We MUST ensure the mock accepts the new onItemClick prop
vi.mock("./search_module", () => ({
  default: ({ onItemClick }: { onItemClick?: () => void }) => (
    <div data-testid="mock-search-module">
      <button data-testid="mock-detail-button" onClick={onItemClick}>
        Mock Details Click
      </button>
    </div>
  ),
}));

describe("SearchModal Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Clean the body to ensure Portals don't leak between tests
    document.body.innerHTML = '<div id="root"></div>'; 
  });

  test("renders correctly in a Portal and displays header", () => {
    render(<SearchModal onClose={mockOnClose} />);

    // Check header text
    expect(screen.getByText(/Search Catalog/i)).toBeInTheDocument();
    
    // Check if the module is rendered inside the modal
    expect(screen.getByTestId("mock-search-module")).toBeInTheDocument();
  });

  test("closes modal when the child SearchModule triggers onItemClick", () => {
    render(<SearchModal onClose={mockOnClose} />);

    // Simulate clicking the "Details" button inside the SearchModule
    const detailBtn = screen.getByTestId("mock-detail-button");
    fireEvent.click(detailBtn);

    // This proves the onClose function was passed down and called correctly
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("closes modal when the close (X) button is clicked", () => {
    render(<SearchModal onClose={mockOnClose} />);

    const closeBtn = screen.getByText("×");
    fireEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("closes when clicking the overlay but NOT when clicking the content", () => {
    render(<SearchModal onClose={mockOnClose} />);

    // 1. Click inside content - should NOT close
    const content = screen.getByTestId("mock-search-module");
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();

    // 2. Click overlay - SHOULD close
    // We target the overlay by class since it's the backdrop
    const overlay = document.querySelector(".modal_overlay");
    if (overlay) fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});