import { Pagination, Stack } from "@mui/material";

interface IPaginationComponent {
  count?: number;
  page?: number;
  onChange: (_: unknown, value: number) => void;
  color: "primary" | "secondary";
  isMobile: boolean;
}

const PaginationComponent = ({
  count = 1,
  page = 1,
  onChange,
  color,
  isMobile,
}: IPaginationComponent) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
      boxShadow={2}
      border="2px solid black"
      borderRadius={2}
      bgcolor="white"
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color={color}
        variant="outlined"
        shape="rounded"
        size={isMobile ? "small" : "large"}
        sx={{
          "& .MuiPagination-ul": {
            gap: "8px",
          },
          "& .MuiPaginationItem-root": {
            color: "black",
            borderColor: "#e5e7eb",
            backgroundColor: "white",
            fontSize: "1.2rem",
            minWidth: "48px",
            height: "48px",
          },
          "& .Mui-selected": {
            backgroundColor: "rgb(135 131 209)",
            color: "#fff",
            border: "2px solid #e5e7eb",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#2a2a2a",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
