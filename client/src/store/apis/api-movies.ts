import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPopularMoviesResponse } from "../../types";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/movies",
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<
      IPopularMoviesResponse,
      { page: number; language?: string }
    >({
      query: ({ page = 1, language = "en-US" }) =>
        `/popular?page=${page}&language=${language}`,
    }),
    searchMovies: builder.query<
      IPopularMoviesResponse,
      { query: string; page: number; language?: string }
    >({
      query: ({ query, page = 1, language = "en-US" }) =>
        `/search?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=${language}&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useSearchMoviesQuery } = moviesApi;
