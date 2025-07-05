export const validatePageParams = (
  searchParams: URLSearchParams,
  maxPage: number = 500
): number => {
  const rawPage = Number(searchParams.get("page"));

  if (isNaN(rawPage) || rawPage < 1) return 1;

  if (typeof maxPage === "number") {
    return rawPage > maxPage ? maxPage : rawPage;
  }

  return rawPage;
};
