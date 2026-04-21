import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { getCategories } from "../../services/books/category";
import BooksCategories from "./books_categories";
import { categoryInterface } from "../../interfaces/interfaces";
import { MemoryRouter } from "react-router-dom";

vi.mock('../../services/books/category');

const mockCategories:categoryInterface[] = [
  { id: 1, name: "Fiction", description: "fiction" },
  { id: 2, name: "Science", description: "science" },
];

describe("Renders the books categories component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        render(<BooksCategories />);
      </MemoryRouter>
    );

    vi.mocked(getCategories).mockReturnValue(new Promise(() => {}));

    expect(screen.getByText(/Loading categories.../i)).toBeInTheDocument();
  });

  test("successfully renders categories and clears loading state", async () => {
    vi.mocked(getCategories).mockResolvedValue(mockCategories);

    render(
      <MemoryRouter>
        render(<BooksCategories />);
      </MemoryRouter>
    );

    await waitFor(() => {
      const loadingElement = screen.queryByText(/loading/i);
      expect(loadingElement).not.toBeInTheDocument();
    });

    const fiction = await screen.findByText("Fiction");

    expect(fiction).toBeInTheDocument();
  });

  test("renders error message on API failure", async () => {
    vi.mocked(getCategories).mockRejectedValue(new Error("API Error"));

    render(
      <MemoryRouter>
        render(<BooksCategories />);
      </MemoryRouter>
    );

    const apiError = await screen.findByText(/API Error/i);

    expect(apiError).toBeInTheDocument();
  });
});
