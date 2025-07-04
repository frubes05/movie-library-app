import { createContext } from "react";
import type { IPopularMoviesResponseResult } from "../../../types";

interface MoviesContextType {
  movies?: Array<IPopularMoviesResponseResult>;
  currentPage?: number;
  count?: number;
  isLoading?: boolean;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);
