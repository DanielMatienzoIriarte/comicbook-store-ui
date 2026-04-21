import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import TopMenu from "./top_menu";

vi.mock("../search/SearchModule", () => ({
  default: () => <div data-testid="search-module-mock">Mocked Search Modal</div>
}));

describe("TopMenu Navigation", () => {
  test("opens search modal when Search link is clicked", async () => {
    render(
      <MemoryRouter>
        <TopMenu />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("search-module-mock")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/search/i));

    expect(screen.getByText("Search Catalog")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(
      <MemoryRouter>
        <TopMenu />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/search/i));
    const closeBtn = screen.getByText("×");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("search-module-mock")).not.toBeInTheDocument();
  });
});