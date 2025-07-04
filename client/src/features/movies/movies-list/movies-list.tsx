import { Box, Grid } from "@mui/material";
import MoviesCard from "../movies-card/movies-card";
import type { IPopularMoviesResponseResult } from "../../../types";
import PaginationComponent from "../../../components/pagination/pagination";

interface IMoviesList {
  movies?: Array<IPopularMoviesResponseResult>;
  page?: number;
  count?: number;
  onPageChange: (elem: number) => void;
}

const MoviesList = (moviesListData: IMoviesList) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {moviesListData.movies?.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
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
