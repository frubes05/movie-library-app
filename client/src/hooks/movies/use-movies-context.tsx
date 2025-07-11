import { useContext } from "react";
import { MoviesContext } from "../../context/movies/context";

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);

  if (!context)
    throw new Error("useMovieContext must be used inside MovieProvider");
  return context;
};
