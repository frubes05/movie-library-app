import MainLayout from "../../layouts/main-layout/main-layout";
import { useGlobalContext } from "../../hooks/global";
import { MoviesContextProvider } from "../../context/movies/provider";
import MoviesWrapper from "../../features/movies/movies-wrapper/movies-wrapper";
import SearchWrapper from "../../features/search/search-wrapper/search-wrapper";

const MainPage = () => {
  const {
    searchQuery,
    page,
    onPageChange,
    onInputChange,
    onSubmitSearch,
    isMobile,
  } = useGlobalContext();

  return (
    <MoviesContextProvider
      movieData={{ page, searchQuery, isSearching: Boolean(searchQuery) }}
    >
      <MainLayout
        title="Movies Library"
        searchSection={
          <SearchWrapper
            query={searchQuery}
            onInputChange={onInputChange}
            onSubmitSearch={onSubmitSearch}
            isMobile={isMobile}
          />
        }
        content={
          <MoviesWrapper onPageChange={onPageChange} isMobile={isMobile} />
        }
      />
    </MoviesContextProvider>
  );
};

export default MainPage;
