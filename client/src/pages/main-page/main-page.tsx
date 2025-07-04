import { Stack } from "@mui/material";
import MainLayout from "../../layouts/main-layout/main-layout";
import MoviesList from "../../features/movies/movies-list/movies-list";
import SearchForm from "../../features/search/search-form/search-form";
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../../store/apis";
import { useMovieContext } from "../../hooks/movies";
import { useMemo } from "react";

const MainPage = () => {
  const {
    searchQuery,
    page,
    onPageChange,
    input,
    onInputChange,
    onSubmitSearch,
  } = useMovieContext();
  const isSearching = Boolean(searchQuery);

  const { data: popularData } = useGetPopularMoviesQuery(
    { page },
    { skip: isSearching }
  );
  const { data: searchData } = useSearchMoviesQuery(
    { query: searchQuery, page },
    { skip: !isSearching }
  );

  const movies = useMemo(
    () => (isSearching ? searchData?.results : popularData?.results),
    [isSearching, searchData, popularData]
  );
  const currentPage = useMemo(
    () => (isSearching ? searchData?.page : popularData?.page),
    [isSearching, searchData, popularData]
  );
  const count = useMemo(
    () => (!isSearching ? 500 : searchData?.total_pages),
    [isSearching, searchData]
  );

  return (
    <MainLayout
      title="Movies List"
      filterSection={
        <Stack spacing={2}>
          <SearchForm
            query={searchQuery}
            input={input}
            onInputChange={onInputChange}
            onSubmitSearch={onSubmitSearch}
          />
        </Stack>
      }
      content={
        <MoviesList
          movies={movies}
          count={count}
          page={currentPage}
          onPageChange={onPageChange}
        />
      }
    />
  );
};

export default MainPage;
