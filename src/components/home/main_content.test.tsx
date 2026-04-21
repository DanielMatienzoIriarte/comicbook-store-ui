import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import MainContent from "./main_content";
import { getLatestComicBooks } from "../../services/books/book";
import { bookInterface } from "../../interfaces/interfaces";

vi.mock("../../services/books/book");

vi.mock("../books/render_books", () => ({
  default: ({ books }: { books: bookInterface[] }) => (
    <div data-testid="final-render">
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </div>
  ),
}));

const mockData: bookInterface[] = [
  { id: 1, name: "Comic Book 1", description: "Standard Mock" },
];

const book_limit = 1;

describe("MainContent Component - Stable Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders recovered data correctly", async () => {
    vi.mocked(getLatestComicBooks).mockResolvedValue(mockData);

    render(
      <MemoryRouter>
        <MainContent books_limit={book_limit} />
      </MemoryRouter>
    );

    /**
     * Why 'findBy' is the fix:
     * 1. Initial render is null (books=null, isLoading=false).
     * 2. useEffect triggers, isLoading becomes true (renders "Loading books...").
     * 3. Promise resolves, books populate (renders "Comic Book 1").
     * * findBy automatically waits for all these cycles to complete.
     */
    const bookTitle = await screen.findByText("Comic Book 1", {}, { timeout: 3000 });
    expect(bookTitle).toBeInTheDocument();
    expect(screen.getByTestId("final-render")).toBeInTheDocument();
    expect(getLatestComicBooks).toHaveBeenCalledWith(1);
  });

  test("handles the failure path without act errors", async () => {
    const errorMsg = "Service Unavailable";
    vi.mocked(getLatestComicBooks).mockRejectedValue(new Error(errorMsg));

    render(
      <MemoryRouter>
        <MainContent books_limit={book_limit} />
      </MemoryRouter>
    );

    const errorDisplay = await screen.findByText(errorMsg);
    expect(errorDisplay).toBeInTheDocument();
    expect(errorDisplay).toHaveClass("error-banner");
    
    expect(screen.queryByText(/loading books.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Comic Book 1"/i)).not.toBeInTheDocument();
  });
});
