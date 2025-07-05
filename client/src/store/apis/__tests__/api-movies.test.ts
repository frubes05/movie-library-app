import { describe, it, expect } from "vitest";
import {
  moviesApi,
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../api-movies";

describe("Movies API", () => {
  it("should have the correct reducer path", () => {
    expect(moviesApi.reducerPath).toBe("moviesApi");
  });

  it("should define getPopularMovies endpoint", () => {
    const endpoint = moviesApi.endpoints.getPopularMovies;
    expect(endpoint).toBeDefined();
    expect(typeof endpoint.initiate).toBe("function");
  });

  it("should define searchMovies endpoint", () => {
    const endpoint = moviesApi.endpoints.searchMovies;
    expect(endpoint).toBeDefined();
    expect(typeof endpoint.initiate).toBe("function");
  });

  it("should expose useGetPopularMoviesQuery hook", () => {
    expect(typeof useGetPopularMoviesQuery).toBe("function");
  });

  it("should expose useSearchMoviesQuery hook", () => {
    expect(typeof useSearchMoviesQuery).toBe("function");
  });
});
