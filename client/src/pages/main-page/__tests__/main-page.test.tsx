import { describe, it, expect } from "vitest";
import { render, screen } from "../../../test/test-utils";
import MainPage from "../main-page";

describe("MainPage", () => {
  it("should render the main layout with title", () => {
    render(<MainPage />);

    expect(screen.getByText("Movies Library")).toBeInTheDocument();
    expect(screen.getByTestId("MovieFilterIcon")).toBeInTheDocument();
  });

  it("should render main page section", () => {
    render(<MainPage />);

    const gridContainer = screen.getByRole("main");
    expect(gridContainer).toBeInTheDocument();
  });

  it("should have proper page structure", () => {
    const { container } = render(<MainPage />);

    const containerElement = container.querySelector(".MuiContainer-root");
    expect(containerElement).toBeInTheDocument();
  });
});
