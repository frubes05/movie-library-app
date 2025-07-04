import { useMemo, type ReactNode } from "react";
import { MoviesContext } from "../context";
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../../../store/apis";

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
  const { data: popularData, isLoading: isPopularDataLoading } =
    useGetPopularMoviesQuery({ page }, { skip: isSearching });
  const { data: searchData, isLoading: isSearchDataLoading } =
    useSearchMoviesQuery({ query: searchQuery, page }, { skip: !isSearching });

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
