import { Box, Grid } from "@mui/material";
import MoviesCard from "../movies-card/movies-card";
import type { IPopularMoviesResponseResult } from "../../../types";
import CardSkeletonComponent from "../../../components/card/card-skeleton/card-skeleton";

interface IMoviesList {
  movies?: Array<IPopularMoviesResponseResult>;
  isLoading?: boolean;
  isMobile: boolean;
}

const MoviesList = (moviesListData: IMoviesList) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {moviesListData.isLoading
          ? Array.from({ length: 20 }).map(() => (
              <Grid
                container
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={`skeleton-${crypto.randomUUID()}`}
              >
                <CardSkeletonComponent isMobile={moviesListData.isMobile} />
              </Grid>
            ))
          : moviesListData.movies?.map((movie) => (
              <Grid
                container
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={movie.id}
              >
                <MoviesCard {...movie} isMobile={moviesListData.isMobile} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default MoviesList;
