import { describe, it, expect } from "vitest";
import { moviesApi } from "./api-movies";

describe("Movies API", () => {
  it("should have correct reducer path", () => {
    expect(moviesApi.reducerPath).toBe("moviesApi");
  });

  it("should have getPopularMovies endpoint", () => {
    expect(moviesApi.endpoints.getPopularMovies).toBeDefined();
  });

  it("should have searchMovies endpoint", () => {
    expect(moviesApi.endpoints.searchMovies).toBeDefined();
  });

  it("should generate correct query for popular movies", () => {
    const queryFn = moviesApi.endpoints.getPopularMovies.useQuery;
    const query = queryFn({ page: 1, language: "en-US" });

    expect(query).toBe("/popular?page=1&language=en-US");
  });

  it("should generate correct query for search movies", () => {
    const queryFn = moviesApi.endpoints.searchMovies.useQuery;
    const query = queryFn({
      query: "test movie",
      page: 1,
      language: "en-US",
    });

    expect(query).toBe(
      "/search?query=test%20movie&include_adult=false&language=en-US&page=1"
    );
  });
});
