import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import BookPreview from "./book_preview";
import { bookInterface } from "../../interfaces/interfaces";
import "@testing-library/jest-dom";

describe("BookPreview Component", () => {
  const mockBook: bookInterface = {
    id: 99,
    name: "Comic Book 3",
    description: "Comic Book Desc.",
  };

  test("renders book information correctly", () => {
    render(
      <MemoryRouter>
        <BookPreview {...mockBook} />
      </MemoryRouter>
    );

    // Use a regex or matcher since it's combined with the <span>
    expect(screen.getByText(/Comic Book 3/i)).toBeInTheDocument();
    expect(screen.getByText(/\(by Best Author\)/i)).toBeInTheDocument();

    expect(screen.getByText("Comic Book Desc.")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "images/templatemo_image_01.jpg");
    expect(img).toHaveAttribute("alt", "image");
  });

  test("generates the correct Link path for the details button", () => {
    render(
      <MemoryRouter>
        <BookPreview {...mockBook} />
      </MemoryRouter>
    );

    const detailsLink = screen.getByRole("link", { name: /details/i });
    expect(detailsLink).toHaveAttribute("href", "/book/99");
  });

  test("renders the Buy Now static link", () => {
    render(
      <MemoryRouter>
        <BookPreview {...mockBook} />
      </MemoryRouter>
    );

    const buyLink = screen.getByRole("link", { name: /buy now/i });
    expect(buyLink).toHaveAttribute("href", "subpage.html");
  });
});