import { describe, it, expect } from "vitest";
import { render, screen } from "../../../test/test-utils";
import MoviesCard from "./movies-card";
import type { IPopularMoviesResponseResult } from "../../../types";

describe("MoviesCard", () => {
  const mockMovie: IPopularMoviesResponseResult = {
    id: 1,
    title: "Test Movie",
    original_title: "Test Movie",
    original_language: "en",
    overview: "This is a test movie description",
    release_date: "2023-12-25",
    poster_path: "/test-poster.jpg",
    backdrop_path: "/test-backdrop.jpg",
    genre_ids: [1, 2, 3],
    popularity: 100,
    vote_average: 7.5,
    vote_count: 1000,
    video: false,
    adult: false,
  };

  it("should render movie title", () => {
    render(<MoviesCard {...mockMovie} isMobile={false} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("should render movie overview", () => {
    render(<MoviesCard {...mockMovie} isMobile={false} />);
    expect(
      screen.getByText("This is a test movie description")
    ).toBeInTheDocument();
  });

  it("should render formatted release date", () => {
    render(<MoviesCard {...mockMovie} isMobile={false} />);
    expect(screen.getByText("25th of December")).toBeInTheDocument();
  });

  it("should render rating badge with correct value", () => {
    render(<MoviesCard {...mockMovie} isMobile={false} />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("should render movie poster with correct src", () => {
    render(<MoviesCard {...mockMovie} isMobile={false} />);
    const poster = screen.getByAltText("Test Movie");
    expect(poster).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342/test-poster.jpg"
    );
  });

  it("should use fallback image when poster_path is empty string", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: "" };
    render(<MoviesCard {...movieWithoutPoster} isMobile={false} />);
    const poster = screen.getByAltText("Test Movie");
    expect(poster).toHaveAttribute("src", "/fallback.jpg");
  });

  it('should show "No description available" when overview is empty', () => {
    const movieWithoutOverview = { ...mockMovie, overview: "" };
    render(<MoviesCard {...movieWithoutOverview} isMobile={false} />);
    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });
});
