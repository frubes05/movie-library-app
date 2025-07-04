import { Stack } from "@mui/material";
import SearchForm from "../search";
import { useMoviesContext } from "../../../hooks/movies";
import SearchFormSkeleton from "../search-skeleton/search-skeleton";

const SearchWrapper = ({
  query,
  onInputChange,
  onSubmitSearch,
  isMobile,
}: {
  query: string;
  onInputChange: (val: string) => void;
  onSubmitSearch: (val: string) => void;
  isMobile: boolean;
}) => {
  const { isLoading } = useMoviesContext();

  return (
    <Stack spacing={2}>
      {isLoading ? (
        <SearchFormSkeleton />
      ) : (
        <SearchForm
          query={query}
          onInputChange={onInputChange}
          onSubmitSearch={onSubmitSearch}
          isMobile={isMobile}
        />
      )}
    </Stack>
  );
};

export default SearchWrapper;
