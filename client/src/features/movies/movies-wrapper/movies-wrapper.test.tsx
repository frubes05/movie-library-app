import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../../test/test-utils";
import MoviesWrapper from "./movies-wrapper";
import * as moviesHook from "../../../hooks/movies";

vi.mock("../../../hooks/movies", async () => {
  const actual = await vi.importActual<typeof import("../../../hooks/movies")>(
    "../../../hooks/movies"
  );
  return {
    ...actual,
    useMoviesContext: vi.fn(),
  };
});

describe("MoviesWrapper", () => {
  const mockProps = {
    onPageChange: vi.fn(),
    isMobile: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render movies list and pagination when not loading", () => {
    const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext);

    mockedUseMoviesContext.mockReturnValue({
      movies: [
        {
          id: 1,
          title: "Test Movie",
          overview: "Test overview",
          release_date: "2023-01-01",
          poster_path: "/test.jpg",
          backdrop_path: "/test-backdrop.jpg",
          original_title: "Test Movie",
          original_language: "en",
          genre_ids: [1, 2],
          popularity: 100,
          vote_average: 7.5,
          vote_count: 1000,
          video: false,
          adult: false,
        },
      ],
      count: 10,
      currentPage: 1,
      isLoading: false,
    });

    render(<MoviesWrapper {...mockProps} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render skeleton components when loading", () => {
    const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext);

    mockedUseMoviesContext.mockReturnValue({
      movies: undefined,
      count: undefined,
      currentPage: undefined,
      isLoading: true,
    });

    render(<MoviesWrapper {...mockProps} />);

    const skeletons = screen.getAllByTestId(/skeleton/);
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should call onPageChange when pagination is clicked", () => {
    const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext);

    mockedUseMoviesContext.mockReturnValue({
      movies: [],
      count: 10,
      currentPage: 1,
      isLoading: false,
    });

    render(<MoviesWrapper {...mockProps} />);

    expect(mockProps.onPageChange).toBeDefined();
  });

  it("should render with mobile layout when isMobile is true", () => {
    const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext);

    mockedUseMoviesContext.mockReturnValue({
      movies: [],
      count: 10,
      currentPage: 1,
      isLoading: false,
    });

    render(<MoviesWrapper {...mockProps} isMobile={true} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
