import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPopularMoviesResponse } from "../../types";

// Enhanced base query with error handling
const baseQueryWithErrorHandling = fetchBaseQuery({
  baseUrl: "http://localhost:9000/api/movies",
  prepareHeaders: (headers, { getState }) => {
    // Add request ID for tracking
    headers.set('x-request-id', `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    return headers;
  },
});

const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQueryWithErrorHandling(args, api, extraOptions);
  
  // Retry logic for network errors
  if (result.error && result.error.status === 'FETCH_ERROR') {
    // Wait 1 second and retry once
    await new Promise(resolve => setTimeout(resolve, 1000));
    result = await baseQueryWithErrorHandling(args, api, extraOptions);
  }
  
  return result;
};

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ['PopularMovies', 'SearchResults'],
  endpoints: (builder) => ({
    getPopularMovies: builder.query<
      IPopularMoviesResponse,
      { page: number; language?: string }
    >({
      query: ({ page = 1, language = "en-US" }) =>
        `/popular?page=${page}&language=${language}`,
      providesTags: (result, error, { page }) => [
        { type: 'PopularMovies', id: page },
        { type: 'PopularMovies', id: 'LIST' }
      ],
      // Keep data for 5 minutes
      keepUnusedDataFor: 300,
    }),
    searchMovies: builder.query<
      IPopularMoviesResponse,
      { query: string; page: number; language?: string }
    >({
      query: ({ query, page = 1, language = "en-US" }) =>
        `/search?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=${language}&page=${page}`,
      providesTags: (result, error, { query, page }) => [
        { type: 'SearchResults', id: `${query}-${page}` },
        { type: 'SearchResults', id: 'LIST' }
      ],
      // Keep search data for 2 minutes
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useSearchMoviesQuery } = moviesApi;