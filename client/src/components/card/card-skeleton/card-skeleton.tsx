import { CardContent, Skeleton, Typography, Box } from "@mui/material";
import CardComponent from "../card";

const CardSkeletonComponent = () => {
  const cardHeaderContent = (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height={360}
      data-testid="skeleton"
      sx={{
        objectFit: "cover",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    />
  );

  const cardBodyContent = (
    <CardContent>
      <Box sx={{ minHeight: 60 }}>
        <Skeleton variant="text" width="100%" height={28} animation="wave" />
      </Box>

      <Typography
        variant="body1"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          minHeight: "4.5em",
          lineHeight: 1.5,
        }}
      >
        <Skeleton width="100%" />
        <Skeleton width="90%" />
        <Skeleton width="75%" />
      </Typography>

      <Skeleton width="40%" height={20} sx={{ mt: 2 }} />
    </CardContent>
  );

  return (
    <CardComponent
      cardHeaderContent={cardHeaderContent}
      cardBodyContent={cardBodyContent}
    />
  );
};

export default CardSkeletonComponent;
