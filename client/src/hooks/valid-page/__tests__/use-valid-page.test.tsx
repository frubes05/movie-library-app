import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { useValidPage } from "../use-valid-page";
import { MoviesContext } from "../../../context/movies";

const TestComponent = ({ dynamicCount }: { dynamicCount?: number }) => {
  useValidPage(dynamicCount);
  const [params] = useSearchParams();

  return <div>Page: {params.get("page")}</div>;
};

describe("useValidPage", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should fallback to dynamicCount if provided", () => {
    const contextValue = {
      count: 100,
      currentPage: 1,
      isLoading: false,
      movies: [],
    };

    const screen = render(
      <MoviesContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/?page=2000"]}>
          <TestComponent dynamicCount={8} />
        </MemoryRouter>
      </MoviesContext.Provider>
    );

    expect(screen.getByText(/Page: 8/)).toBeDefined();
  });
});
