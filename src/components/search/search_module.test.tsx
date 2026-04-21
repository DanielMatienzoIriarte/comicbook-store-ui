import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SearchModule from "./search_module";
import * as bookService from "../../services/books/book";

// Mock the service
vi.mock("../../services/books/book");

describe("SearchModule - Full Integration", () => {
  const mockPaginator = {
    current_page: 1,
    data: [{ id: 1, name: "The Amazing Spider-Man", description: "Peter Parker", author: "", price: 1.14 }],
    from: 1,
    to: 1,
    total: 1,
    last_page: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers(); // Real timers are safer now that imports are fixed
    
    document.body.innerHTML = '';
  });

  test("flows from input to results successfully", async () => {
    // Setup mock
    vi.mocked(bookService.searchBooks).mockResolvedValue(mockPaginator as any);

    render(
      <MemoryRouter>
        <SearchModule />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search for comics.../i);
    
    // Act
    fireEvent.change(input, { target: { value: "Spider" } });

    // Assert: Wait for the debounce (500ms) and the promise
    await waitFor(() => {
      expect(screen.getByText(/The Amazing Spider-Man/i)).toBeInTheDocument();
      expect(screen.getByText(/Showing 1-1 of 1 results/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test("handles the onItemClick callback", async () => {
    const callback = vi.fn();
    vi.mocked(bookService.searchBooks).mockResolvedValue(mockPaginator as any);

    render(
      <MemoryRouter>
        <SearchModule onItemClick={callback} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/search for comics.../i), { 
      target: { value: "Spider" } 
    });

    // Wait for content to appear
    const detailBtn = await screen.findByText(/details/i, {}, { timeout: 3000 });
    fireEvent.click(detailBtn);

    expect(callback).toHaveBeenCalled();
  });
});