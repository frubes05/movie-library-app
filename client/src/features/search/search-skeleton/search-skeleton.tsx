import { Box, Skeleton, Stack, useTheme, useMediaQuery } from "@mui/material";

const SearchFormSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <form>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{
          gap: "24px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <Skeleton
            variant="rectangular"
            height={58}
            sx={{
              borderRadius: 2,
              width: "100%",
            }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          height={58}
          width={isMobile ? "100%" : 150}
          sx={{
            borderRadius: 2,
          }}
        />
      </Stack>
    </form>
  );
};

export default SearchFormSkeleton;
