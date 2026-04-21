import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import BookDetail from "./book_details";
import { getComicBookById } from "../../services/books/book";
import { bookInterface } from "../../interfaces/interfaces";
import "@testing-library/jest-dom";

vi.mock("../../services/books/book");

describe("BookDetail Component", () => {
  const mockBook: bookInterface = {
    id: 123,
    name: "Comic Book 1",
    description: "Comic Book 1 Details",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("extracts ID from URL and renders book details", async () => {
    vi.mocked(getComicBookById).mockResolvedValue(mockBook);

    render(
      <MemoryRouter initialEntries={["/book/123"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </MemoryRouter>
    );

      expect(screen.getByText(/loading book details.../i)).toBeInTheDocument();

    const bookTitle = await screen.findByText("Comic Book 1");
    expect(bookTitle).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();

    expect(getComicBookById).toHaveBeenCalledWith("123");
    
    // Verify the "Back to Catalog" link exists
    const backLink = screen.getByRole("link", { name: /back to catalog/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  test("renders error message when API fails", async () => {
    const errorMessage = "Book not found in database";
    vi.mocked(getComicBookById).mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={["/book/404"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const errorBanner = await screen.findByText(errorMessage);
    expect(errorBanner).toBeInTheDocument();
  });

  test("renders 'Book not found' if API returns null", async () => {
    // @ts-ignore
    vi.mocked(getComicBookById).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={["/book/999"]}>
        <Routes>
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const missingMsg = await screen.findByText(/book not found/i);
    expect(missingMsg).toBeInTheDocument();
  });
});