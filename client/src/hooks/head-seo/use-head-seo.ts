import { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface SEOState {
  title: string;
  description: string;
  url: string;
}

export const useHeadSEO = (searchQuery?: string, page?: number): SEOState => {
  const location = useLocation();
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_LOCAL_PROD_URL
      : import.meta.env.VITE_LOCAL_BASE_URL;

  return useMemo(() => {
    const fullUrl = `${baseUrl}${location.pathname}${location.search}`;

    console.log(searchQuery, page);

    if (searchQuery) {
      return {
        title: `Search Results for "${searchQuery}" - Movies Library`,
        description: `Discover movies matching "${searchQuery}". Browse search results, ratings, and release dates on Movies Library.`,
        url: fullUrl,
        type: "website",
      };
    }

    if (page && page > 1) {
      return {
        title: `Popular Movies - Page ${page} - Movies Library`,
        description: `Explore popular movies on page ${page}. Browse trending films with ratings, reviews, and release dates.`,
        url: fullUrl,
        type: "website",
      };
    }

    return {
      title: "Movies Library - Discover Popular Movies & Search Your Favorites",
      description:
        "Explore thousands of movies with our comprehensive movie library. Search by title, filter by genres, and discover popular films with ratings, reviews, and release dates.",
      url: baseUrl,
      type: "website",
    };
  }, [searchQuery, page, baseUrl, location.pathname, location.search]);
};
