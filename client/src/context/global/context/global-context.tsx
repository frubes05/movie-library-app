import { createContext } from "react";

interface GlobalContextType {
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
  onInputChange: (val: string) => void;
  onSubmitSearch: (query: string) => void;
  isMobile: boolean;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
