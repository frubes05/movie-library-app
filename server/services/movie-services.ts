export const fetchPopularMovies = async ({
  page,
  language,
}: {
  page: number;
  language: string;
}): Promise<any> => {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}&language=${language}`
  );
  const results = await response.json();

  return results;
};

export const searchMoviesByTitle = async (
  query: string,
  page: number
): Promise<any> => {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/search/movie?api_key=${
      process.env.TMDB_API_KEY
    }&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();

  return data;
};
