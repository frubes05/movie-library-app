import { useCallback, useMemo, useState, type ReactNode } from "react";
import { MovieContext } from "../context";
import { useSearchParams } from "react-router-dom";

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [popularPage, setPopularPage] = useState(
    () => Number(searchParams.get("page")) || 1
  );
  const [searchPage, setSearchPage] = useState(
    () => Number(searchParams.get("page")) || 1
  );
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("query") ?? ""
  );
  const [input, setInput] = useState("");

  const onSearchParamsChange = useCallback(
    (updated: Partial<Record<string, string | number | undefined>>) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        for (const [key, value] of Object.entries(updated)) {
          if (value === undefined || value === null || value === "") {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const onPageChange = useCallback(
    (page: number) => {
      if (searchQuery) {
        setSearchPage(page);
        setPopularPage(1);
      } else {
        setPopularPage(page);
        setSearchPage(1);
      }
      onSearchParamsChange({ page });
    },
    [searchQuery, onSearchParamsChange]
  );

  const onInputChange = useCallback((input: string) => {
    setInput(input);
  }, []);

  const onSubmitSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      setSearchQuery(trimmedQuery);
      onPageChange(1);
      onSearchParamsChange({ query: trimmedQuery ?? undefined, page: 1 });
    },
    [onSearchParamsChange, setSearchQuery, onPageChange]
  );

  const value = useMemo(
    () => ({
      searchQuery,
      page: searchQuery ? searchPage : popularPage,
      input,
      onPageChange,
      onInputChange,
      onSubmitSearch,
    }),
    [
      searchQuery,
      searchPage,
      popularPage,
      input,
      onInputChange,
      onPageChange,
      onSubmitSearch,
    ]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
