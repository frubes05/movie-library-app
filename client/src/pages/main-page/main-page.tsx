import { Stack } from "@mui/material";
import MainLayout from "../../layouts/main-layout/main-layout";
import SearchForm from "../../features/search/search-form/search-form";
import { useGlobalContext } from "../../hooks/global";
import { MoviesContextProvider } from "../../context/movies/provider";
import MoviesWrapper from "../../features/movies/movies-wrapper/movies-wrapper";

const MainPage = () => {
  const {
    searchQuery,
    page,
    onPageChange,
    input,
    onInputChange,
    onSubmitSearch,
    isMobile,
  } = useGlobalContext();

  return (
    <MainLayout
      title="Movies Library"
      searchSection={
        <Stack spacing={2}>
          <SearchForm
            query={searchQuery}
            input={input}
            onInputChange={onInputChange}
            onSubmitSearch={onSubmitSearch}
            isMobile={isMobile}
          />
        </Stack>
      }
      content={
        <MoviesContextProvider
          movieData={{ page, searchQuery, isSearching: Boolean(searchQuery) }}
        >
          <MoviesWrapper onPageChange={onPageChange} isMobile={isMobile} />
        </MoviesContextProvider>
      }
    />
  );
};

export default MainPage;
