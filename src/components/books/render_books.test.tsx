import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import RenderBooks from "./render_books";
import { bookInterface } from "../../interfaces/interfaces";

vi.mock("./book_preview", () => ({
  default: ({ name, id }: { name: string; id: string }) => (
    <div data-testid={`book-item-${id}`}>
      {name}
    </div>
  ),
}));

describe("RenderBooks Component", () => {
  const mockBooks: bookInterface[] = [
    { id: 101, name: "Comic Book 1", description: "Even Index (0)" },
    { id: 102, name: "Comic Book 2", description: "Odd Index (1)" },
    { id: 103, name: "Comic Book 3", description: "Even Index (2)" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all books and applies alternating cleaner classes", () => {
    const { container } = render(
      <MemoryRouter>
        <RenderBooks books={mockBooks} />
      </MemoryRouter>
    );

    const bookItems = screen.getAllByTestId(/book-item-/);
    expect(bookItems).toHaveLength(3);

    expect(screen.getByText("Comic Book 1")).toBeInTheDocument();
    expect(screen.getByText("Comic Book 2")).toBeInTheDocument();

    const widthCleaners = container.getElementsByClassName("cleaner_with_width");
    const heightCleaners = container.getElementsByClassName("cleaner_with_height");

    // Index 0: Even -> width
    // Index 1: Odd  -> height
    // Index 2: Even -> width
    expect(widthCleaners.length).toBe(2); 
    expect(heightCleaners.length).toBe(1);
  });

  test("handles empty books array gracefully", () => {
    const { container } = render(
      <MemoryRouter>
        <RenderBooks books={[]} />
      </MemoryRouter>
    );

    const wrapper = container.querySelector(".templatemo_content_right");
    expect(wrapper).toBeInTheDocument();
    expect(screen.queryByTestId(/book-item-/)).not.toBeInTheDocument();
  });

  test("does not crash if books is null", () => {
    // @ts-ignore - testing runtime resilience against null
    const { container } = render(<RenderBooks books={null} />);
    
    const wrapper = container.querySelector(".templatemo_content_right");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.children.length).toBe(0);
  });
});