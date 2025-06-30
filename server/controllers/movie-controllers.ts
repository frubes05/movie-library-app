import { Request, Response, NextFunction } from "express";
import { cache } from "../cache";
import { fetchPopularMovies, searchMoviesByTitle } from "../services";

export const getPopularMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cacheKey = "popularMovies";
    const cached = cache.get(cacheKey);

    if (cached) {
      res.set("Cache-Control", "public, max-age=3600");
      res.status(200).json(cached);
      return;
    }

    const data = await fetchPopularMovies();
    cache.set(cacheKey, data);
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

    if (!query) {
      res.status(400).json({ error: "Query parameter required" });
      return;
    }

    const result = await searchMoviesByTitle(query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
