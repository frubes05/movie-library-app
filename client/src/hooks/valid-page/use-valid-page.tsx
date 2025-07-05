import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMoviesContext } from "../movies";
import { validatePageParams } from "../../utils";

export const useValidPage = (dynamicCount?: number): boolean => {
  const [searchParams] = useSearchParams();
  const { count: contextCount } = useMoviesContext();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  const maxPage =
    typeof dynamicCount === "number" ? dynamicCount : contextCount;

  useEffect(() => {
    const current = Number(searchParams.get("page"));
    const validated = validatePageParams(searchParams, maxPage);

    if (current !== validated) {
      setIsValid(false);
      searchParams.set("page", validated.toString());
      navigate(`?${searchParams.toString()}`, { replace: true });
    } else {
      setIsValid(true);
    }
  }, [searchParams, maxPage, navigate]);

  return isValid;
};
