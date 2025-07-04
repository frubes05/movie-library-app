import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/test-utils";
import MainPage from "./main-page";

describe("MainPage", () => {
  it("should render the main layout with title", () => {
    render(<MainPage />);

    expect(screen.getByText("Movies Library")).toBeInTheDocument();
    expect(screen.getByTestId("MovieFilterIcon")).toBeInTheDocument();
  });

  it("should render search section", () => {
    const { container } = render(<MainPage />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("should render movies content section", () => {
    render(<MainPage />);

    const gridContainer =
      screen.getByRole("main") || screen.getByTestId("movies-section");
    expect(
      gridContainer || screen.getByText("Movies Library")
    ).toBeInTheDocument();
  });

  it("should have proper page structure", () => {
    const { container } = render(<MainPage />);

    const containerElement = container.querySelector(".MuiContainer-root");
    expect(containerElement).toBeInTheDocument();
  });
});
