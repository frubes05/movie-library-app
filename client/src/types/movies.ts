export interface IPopularMoviesResponseResult {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}

export interface IPopularMoviesResponse {
  page: number;
  results: Array<IPopularMoviesResponseResult>;
  total_pages: number;
  total_results: number;
}
