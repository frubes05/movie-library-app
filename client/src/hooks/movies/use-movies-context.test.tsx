import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMoviesContext } from "./use-movies-context";
import { MoviesContext } from "../../context/movies/context";

describe("useMoviesContext", () => {
  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useMoviesContext());
    }).toThrow("useMovieContext must be used inside MovieProvider");
  });

  it("should return context when used inside provider", () => {
    const mockContextValue = {
      movies: [],
      currentPage: 1,
      count: 10,
      isLoading: false,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MoviesContext.Provider value={mockContextValue}>
        {children}
      </MoviesContext.Provider>
    );

    const { result } = renderHook(() => useMoviesContext(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });
});
