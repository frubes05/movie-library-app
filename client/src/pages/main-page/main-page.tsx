import MainLayout from "../../layouts/main-layout/main-layout";
import { useGlobalContext } from "../../hooks/global";
import { MoviesContextProvider } from "../../context/movies/provider";
import MoviesWrapper from "../../features/movies/movies-wrapper/movies-wrapper";
import SearchWrapper from "../../features/search/search-wrapper/search-wrapper";
import { useHeadSEO } from "../../hooks/head-seo";

const MainPage = () => {
  const {
    searchQuery,
    page,
    onPageChange,
    onInputChange,
    onSubmitSearch,
    isMobile,
  } = useGlobalContext();
  useHeadSEO({
    title: searchQuery
      ? `Search Results for "${searchQuery}" - Movies Library`
      : " Movies Library Application - Discover Popular Movies & Search Your Favorites",
    description: searchQuery
      ? `Browse movies related to "${searchQuery}". Find ratings, reviews, and more.`
      : "Browse popular movies.",
    canonicalUrl: searchQuery
      ? `${window.location.origin}/?page=${page}&query=${encodeURIComponent(
          searchQuery
        )}`
      : `${window.location.origin}/?&page=${page}`,
  });

  return (
    <main>
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
    </main>
  );
};

export default MainPage;
