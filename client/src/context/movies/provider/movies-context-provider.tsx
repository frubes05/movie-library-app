import { useMemo, type ReactNode } from "react";
import { MoviesContext } from "../context";
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../../../store/apis";
import { useNotification } from "../../notification";

export const MoviesContextProvider = ({
  children,
  movieData,
}: {
  children: ReactNode;
  movieData: {
    page: number;
    isSearching: boolean;
    searchQuery: string;
  };
}) => {
  const { page, isSearching, searchQuery } = movieData;
  const { showNotification } = useNotification();

  const { 
    data: popularData, 
    isLoading: isPopularDataLoading,
    error: popularError 
  } = useGetPopularMoviesQuery(
    { page }, 
    { 
      skip: isSearching,
      // Refetch on mount if data is older than 5 minutes
      refetchOnMountOrArgChange: 300
    }
  );

  const { 
    data: searchData, 
    isLoading: isSearchDataLoading,
    error: searchError 
  } = useSearchMoviesQuery(
    { query: searchQuery, page }, 
    { 
      skip: !isSearching || !searchQuery.trim(),
      // Refetch on mount if data is older than 2 minutes
      refetchOnMountOrArgChange: 120
    }
  );

  // Handle errors with notifications
  useMemo(() => {
    if (popularError) {
      const errorMessage = getErrorMessage(popularError);
      showNotification(
        `Failed to load popular movies: ${errorMessage}`,
        "error",
        8000
      );
    }
  }, [popularError, showNotification]);

  useMemo(() => {
    if (searchError) {
      const errorMessage = getErrorMessage(searchError);
      showNotification(
        `Search failed: ${errorMessage}`,
        "error",
        8000
      );
    }
  }, [searchError, showNotification]);

  const movies = isSearching ? searchData?.results : popularData?.results;
  const currentPage = isSearching ? searchData?.page : popularData?.page;
  const count = !isSearching ? 500 : searchData?.total_pages;
  const isLoading = isPopularDataLoading || isSearchDataLoading;

  const value = useMemo(() => {
    return {
      movies,
      currentPage,
      count,
      isLoading,
    };
  }, [movies, currentPage, count, isLoading]);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

// Helper function to extract error messages
function getErrorMessage(error: any): string {
  if (error?.data?.error?.message) {
    return error.data.error.message;
  }
  
  if (error?.status === 'FETCH_ERROR') {
    return "Network connection failed. Please check your internet connection.";
  }
  
  if (error?.status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }
  
  if (error?.status >= 500) {
    return "Server error. Please try again later.";
  }
  
  if (error?.status === 404) {
    return "The requested resource was not found.";
  }
  
  return error?.message || "An unexpected error occurred.";
}