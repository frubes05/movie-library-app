import { Box, Typography } from "@mui/material";

interface RatingBadgeProps {
  rating: number;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 75) return "#21d07a";
  if (rating >= 50) return "#d2d531";
  return "#db2360";
};

const RatingBadge = ({ rating }: RatingBadgeProps) => {
  const bgColor = getRatingColor(rating);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "#081c22",
        border: `3px solid ${bgColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "0.9rem",
        zIndex: 2,
      }}
    >
      <Typography component="span">{Math.round(rating)}</Typography>
    </Box>
  );
};

export default RatingBadge;
