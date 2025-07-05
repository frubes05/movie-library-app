import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      width="100%"
      textAlign="center"
      p={4}
    >
      <Typography
        variant="h3"
        color="black"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <RemoveCircleOutlineIcon sx={{ height: "64px", width: "64px" }} /> No
        movies found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        We couldn't find any results for your search.
      </Typography>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          textTransform: "none",
          backgroundColor: "rgb(135 131 208)",
          height: "56px",
          minWidth: "200px",
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;
