import { useMoviesContext } from "../../../hooks/movies";
import MoviesList from "../movies-list/movies-list";
import { Box } from "@mui/material";
import PaginationComponent from "../../../components/pagination/pagination";
import PaginationSkeletonComponent from "../../../components/pagination/pagination-skeleton/pagination-skeleton";

const MoviesWrapper = ({
  onPageChange,
  isMobile,
}: {
  onPageChange?: (elem: number) => void;
  isMobile: boolean;
}) => {
  const { movies, count, currentPage, isLoading } = useMoviesContext();

  return (
    <section>
      <MoviesList movies={movies} isLoading={isLoading} isMobile={isMobile} />
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        {isLoading ? (
          <PaginationSkeletonComponent isMobile={isMobile} />
        ) : (
          <PaginationComponent
            count={count}
            page={currentPage}
            onChange={(_, value) => onPageChange?.(value)}
            color="primary"
            isMobile={isMobile}
          />
        )}
      </Box>
    </section>
  );
};

export default MoviesWrapper;
