import { Request, Response, NextFunction } from "express";
import { fetchPopularMovies, searchMoviesByTitle } from "../services";
import { CachingHelper } from "../helpers";

export const getPopularMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const language = (req.query.language as string) || "en-US";

  const cacheKey = `popularMovies?page=${page}&language=${language}`;
  const cacheHelper = CachingHelper.getInstance(cacheKey);

  if (cacheHelper.respondWithCache(res)) return;

  try {
    const data = await fetchPopularMovies({ page, language });
    cacheHelper.setToCache(data);
    res.set("Cache-Control", "public, max-age=3600");
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const searchMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = ((req.query.query as string) || "").toLowerCase();
    const page = Number(req.query.page) || 1;

    if (!query) {
      res.status(400).json({ error: "Query parameter required" });
      return;
    }

    const cacheKey = `searchMovies?page=${page}&language=en-US&query=${query}`;
    const cacheHelper = CachingHelper.getInstance(cacheKey);

    if (cacheHelper.respondWithCache(res)) return;

    const result = await searchMoviesByTitle(query, page);
    cacheHelper.setToCache(result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
