import { CardMedia, Typography, Box } from "@mui/material";
import type { IPopularMoviesResponseResult } from "../../../types";
import RatingBadge from "../rating-badge/rating-badge";
import { formatDateWithSuffix } from "../../../utils/date-util";
import CardComponent from "../../../components/card/card";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w342";

interface IMoviesCard extends IPopularMoviesResponseResult {
  isMobile: boolean;
}

const MoviesCard = (movie: IMoviesCard) => {
  const imageUrl = movie.poster_path
    ? `${BASE_IMAGE_URL}${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <CardComponent
      cardHeaderContent={
        <>
          <RatingBadge rating={movie.vote_average * 10} />
          <CardMedia
            component="img"
            height="360"
            image={imageUrl}
            alt={movie.title}
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        </>
      }
      cardBodyContent={
        <>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                lineHeight: 1.4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                color: "text.primary",
              }}
            >
              {movie.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                minHeight: "4.5em",
                mt: 1,
              }}
            >
              {movie.overview || "No description available."}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              fontStyle: "italic",
              fontWeight: 700,
              mt: 2,
            }}
          >
            {formatDateWithSuffix(movie.release_date)}
          </Typography>
        </>
      }
      isMobile={movie.isMobile}
    />
  );
};

export default MoviesCard;
