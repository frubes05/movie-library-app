import { Skeleton, Stack } from "@mui/material";

const PaginationSkeletonComponent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      justifyContent="center"
      alignItems="center"
      padding={4}
      boxShadow={2}
      border="2px solid black"
      borderRadius={2}
      bgcolor="white"
    >
      {Array.from({ length: isMobile ? 4 : 7 }).map((_, idx) => (
        <Skeleton
          key={`pagination-skeleton-${idx}`}
          variant="rectangular"
          width={isMobile ? 28 : 48}
          height={isMobile ? 28 : 48}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#e0e0e0",
          }}
        />
      ))}
    </Stack>
  );
};

export default PaginationSkeletonComponent;
