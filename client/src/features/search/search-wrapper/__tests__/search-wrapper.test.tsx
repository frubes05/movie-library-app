import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "../../../../test/test-utils";
import SearchWrapper from "../search-wrapper";
import * as moviesHook from "../../../../hooks/movies";

describe("SearchWrapper", () => {
  const mockProps = {
    query: "test query",
    onInputChange: vi.fn(),
    onSubmitSearch: vi.fn(),
    isMobile: false,
  };

  let spy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    spy?.mockRestore();
    vi.clearAllMocks();
  });

  it("should render search form when not loading", () => {
    spy = vi.spyOn(moviesHook, "useMoviesContext").mockReturnValue({
      isLoading: false,
    });

    render(<SearchWrapper {...mockProps} />);

    expect(screen.getByLabelText("Search for a movie")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should render search skeleton when loading", () => {
    spy = vi.spyOn(moviesHook, "useMoviesContext").mockReturnValue({
      isLoading: true,
    });

    render(<SearchWrapper {...mockProps} />);

    expect(
      screen.queryByLabelText("Search for a movie")
    ).not.toBeInTheDocument();

    const skeletons = screen.getAllByTestId(/skeleton/);
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should pass props correctly to SearchForm", () => {
    spy = vi.spyOn(moviesHook, "useMoviesContext").mockReturnValue({
      isLoading: false,
    });

    render(<SearchWrapper {...mockProps} />);

    const searchInput = screen.getByLabelText("Search for a movie");
    expect(searchInput).toHaveValue("test query");
  });
});
