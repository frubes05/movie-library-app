import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { IPopularMoviesResponseResult } from "../../../types";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w342";

const MoviesCard = (movie: IPopularMoviesResponseResult) => {
  const imageUrl = movie.poster_path
    ? `${BASE_IMAGE_URL}${movie.poster_path}`
    : "/fallback.jpg";
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: isSmallScreen ? "100%" : "300",
        height: "100%",
        bgcolor: "white",
        color: "black",
        border: "2px solid black",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
        "&:focus, & > button:focus": {
          outline: "none",
        },
        "&:focus-visible, & > button:focus-visible": {
          outline: "none",
        },
      }}
    >
      <CardActionArea>
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
        <CardContent>
          <Box sx={{ minHeight: 60 }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 600,
                lineHeight: "1.3",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {movie.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="gray">
            {movie.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MoviesCard;
