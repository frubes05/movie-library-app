import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MoviesContextProvider } from "../movies-context-provider";
import { useMoviesContext } from "../../../../hooks/movies";
import {
  moviesApi,
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../../../../store/apis";

vi.mock("../../../../store/apis", () => {
  return {
    moviesApi: {
      reducer: vi.fn(),
      middleware: vi.fn(),
      reducerPath: "moviesApi",
    },
    useGetPopularMoviesQuery: vi.fn(),
    useSearchMoviesQuery: vi.fn(),
  };
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      [moviesApi.reducerPath]: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

const mockedUseGetPopularMoviesQuery =
  useGetPopularMoviesQuery as unknown as jest.Mock;
const mockedUseSearchMoviesQuery = useSearchMoviesQuery as unknown as jest.Mock;

describe("MoviesContextProvider", () => {
  const mockPopularData = {
    data: {
      results: [{ id: 1, title: "Popular Movie" }],
      page: 1,
      total_pages: 500,
    },
    isLoading: false,
  };

  const mockSearchData = {
    data: {
      results: [{ id: 2, title: "Search Movie" }],
      page: 1,
      total_pages: 20,
    },
    isLoading: false,
  };

  beforeEach(() => {
    mockedUseGetPopularMoviesQuery.mockReturnValue(mockPopularData);
    mockedUseSearchMoviesQuery.mockReturnValue(mockSearchData);
  });

  const createWrapper = (movieData: {
    page: number;
    isSearching: boolean;
    searchQuery: string;
  }) => {
    const store = createTestStore();
    return ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <MoviesContextProvider movieData={movieData}>
          {children}
        </MoviesContextProvider>
      </Provider>
    );
  };

  it("should provide movies context", () => {
    const wrapper = createWrapper({
      page: 1,
      isSearching: false,
      searchQuery: "",
    });

    const { result } = renderHook(() => useMoviesContext(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.movies).toEqual([{ id: 1, title: "Popular Movie" }]);
    expect(typeof result.current.isLoading).toBe("boolean");
  });

  it("should handle search mode correctly", () => {
    const wrapper = createWrapper({
      page: 1,
      isSearching: true,
      searchQuery: "test",
    });

    const { result } = renderHook(() => useMoviesContext(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.movies).toEqual([{ id: 2, title: "Search Movie" }]);
  });
});
