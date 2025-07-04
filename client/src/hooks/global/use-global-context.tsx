import { useContext } from "react";
import { GlobalContext } from "../../context/global/context";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useMovieContext must be used inside MovieProvider");
  return context;
};
