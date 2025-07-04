import { Box, Grid } from "@mui/material";
import MoviesCard from "../movies-card/movies-card";
import type { IPopularMoviesResponseResult } from "../../../types";
import PaginationComponent from "../../../components/pagination/pagination";
import CardSkeletonComponent from "../../../components/card/card-skeleton/card-skeleton";

interface IMoviesList {
  movies?: Array<IPopularMoviesResponseResult>;
  page?: number;
  count?: number;
  onPageChange: (elem: number) => void;
  isLoading: boolean;
}

const MoviesList = (moviesListData: IMoviesList) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {!moviesListData.isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Grid
                container
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={`skeleton-${idx}`}
              >
                <CardSkeletonComponent />
              </Grid>
            ))
          : moviesListData.movies?.map((movie) => (
              <Grid
                container
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={movie.id}
              >
                <MoviesCard {...movie} />
              </Grid>
            ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <PaginationComponent
          count={moviesListData?.count}
          page={moviesListData?.page}
          onChange={(_, value) => moviesListData.onPageChange(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default MoviesList;
