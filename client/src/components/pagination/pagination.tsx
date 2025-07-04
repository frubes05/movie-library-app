import { Pagination } from "@mui/material";

interface IPaginationComponent {
  count?: number;
  page?: number;
  onChange: (_: unknown, value: number) => void;
  color: "primary" | "secondary";
}

const PaginationComponent = (paginationData: IPaginationComponent) => {
  const { count = 1, page = 1, onChange, color } = paginationData;

  return (
    <Pagination count={count} page={page} onChange={onChange} color={color} />
  );
};

export default PaginationComponent;
