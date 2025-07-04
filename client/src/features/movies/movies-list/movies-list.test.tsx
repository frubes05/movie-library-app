import { describe, it, expect } from "vitest";
import { render, screen } from "../../../test/test-utils";
import MoviesList from "./movies-list";
import type { IPopularMoviesResponseResult } from "../../../types";

describe("MoviesList", () => {
  const mockMovies: Array<IPopularMoviesResponseResult> = [
    {
      id: 1,
      title: "Test Movie 1",
      original_title: "Test Movie 1",
      original_language: "en",
      overview: "This is test movie 1",
      release_date: "2023-01-01",
      poster_path: "/test1.jpg",
      backdrop_path: "/test1-backdrop.jpg",
      genre_ids: [1, 2, 3],
      popularity: 100,
      vote_average: 7.5,
      vote_count: 1000,
      video: false,
      adult: false,
    },
    {
      id: 2,
      title: "Test Movie 2",
      original_title: "Test Movie 2",
      original_language: "en",
      overview: "This is test movie 2",
      release_date: "2023-02-01",
      poster_path: "/test2.jpg",
      backdrop_path: "/test2-backdrop.jpg",
      genre_ids: [4, 5, 6],
      popularity: 90,
      vote_average: 8.0,
      vote_count: 1500,
      video: false,
      adult: false,
    },
  ];

  const defaultProps = {
    movies: mockMovies,
    isLoading: false,
    isMobile: false,
  };

  it("should render movies when provided", () => {
    render(<MoviesList {...defaultProps} />);

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
    expect(screen.getByText("This is test movie 1")).toBeInTheDocument();
    expect(screen.getByText("This is test movie 2")).toBeInTheDocument();
  });

  it("should render skeleton cards when loading", () => {
    render(<MoviesList {...defaultProps} isLoading={true} />);

    const skeletons = screen.getAllByTestId(/skeleton/);
    expect(skeletons.length).toBeGreaterThan(0);

    expect(screen.queryByText("Test Movie 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Movie 2")).not.toBeInTheDocument();
  });

  it("should render empty grid when no movies and not loading", () => {
    render(<MoviesList {...defaultProps} movies={[]} />);

    const gridContainer = document.querySelector(".MuiGrid-container");
    expect(gridContainer || screen.getByTestId("movies-grid")).toBeDefined();

    expect(screen.queryByText("Test Movie 1")).not.toBeInTheDocument();
  });

  it("should render with mobile layout when isMobile is true", () => {
    render(<MoviesList {...defaultProps} isMobile={true} />);

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("should handle undefined movies prop", () => {
    render(<MoviesList {...defaultProps} movies={undefined} />);

    expect(screen.queryByText("Test Movie 1")).not.toBeInTheDocument();
  });

  it("should render correct number of skeleton cards when loading", () => {
    render(<MoviesList {...defaultProps} isLoading={true} />);
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBe(20);
  });

  it("should render movies in grid layout", () => {
    render(<MoviesList {...defaultProps} />);
    const movieCards = screen.getAllByTestId("movies-card");
    expect(movieCards.length).toBe(mockMovies.length);
  });

  it("should pass isMobile prop to movie cards", () => {
    render(<MoviesList {...defaultProps} isMobile={true} />);

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("should use unique keys for skeleton cards", () => {
    render(<MoviesList {...defaultProps} isLoading={true} />);
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBe(20);
  });

  it("should use movie id as key for movie cards", () => {
    render(<MoviesList {...defaultProps} />);
    const movieCards = screen.getAllByTestId("movies-card");
    expect(movieCards.length).toBe(mockMovies.length);
  });
});
