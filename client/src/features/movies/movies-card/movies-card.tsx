import { Typography } from "@mui/material";
import CardComponent from "../../../components/card/card";
import type { IPopularMoviesResponseResult } from "../../../types";

const MoviesCard = (movie: IPopularMoviesResponseResult) => {
  return (
    <CardComponent>
      <Typography variant="h6">{movie.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {movie.release_date}
      </Typography>
    </CardComponent>
  );
};

export default MoviesCard;
