import { Pagination, PaginationItem, Stack } from "@mui/material";

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
        renderItem={(item) => {
          if (!isMobile) return <PaginationItem {...item} />;

          if (
            item.type === "previous" ||
            item.type === "next" ||
            (item.type === "page" && item.page === page)
          ) {
            return <PaginationItem {...item} component="div" />;
          }

          return <></>;
        }}
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
            backgroundColor: "rgb(135 131 209) !important",
            color: "#fff !important",
            border: "2px solid #e5e7eb",
            "&:hover": {
              backgroundColor: "rgba(135, 131, 209, 0.2) !important",
            },
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(135, 131, 209, 0.2) !important",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
