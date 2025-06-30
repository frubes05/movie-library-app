export const fetchPopularMovies = async (): Promise<any> => {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
  );
  const results = await response.json();

  return results;
};

export const searchMoviesByTitle = async (query: string): Promise<any> => {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/search/movie?api_key=${
      process.env.TMDB_API_KEY
    }&language=en-US&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  return data;
};
