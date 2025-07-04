import { createContext } from "react";

interface MovieContextType {
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
  input: string;
  onInputChange: (val: string) => void;
  onSubmitSearch: (query: string) => void;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);
