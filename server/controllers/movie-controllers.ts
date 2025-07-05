import { Request, Response, NextFunction } from "express";
import { fetchPopularMovies, searchMoviesByTitle } from "../services";
import { AdvancedCachingHelper } from "../helpers/advanced-caching-helper";

export const getPopularMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const language = (req.query.language as string) || "en-US";

  const cacheKey = `popularMovies:${page}:${language}`;
  const cacheHelper = AdvancedCachingHelper.getInstance(cacheKey);

  // Try to respond with cached data
  if (cacheHelper.respondWithCache(res, {
    maxAge: 3600,
    staleWhileRevalidate: true
  })) {
    return;
  }

  try {
    const data = await fetchPopularMovies({ page, language });
    
    // Cache with advanced configuration
    cacheHelper.setToCache(data, {
      ttl: 3600, // 1 hour
      tags: ['movies', 'popular', `page:${page}`],
      staleWhileRevalidate: true
    });

    res.set({
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
      'X-Cache': 'MISS'
    });
    res.status(200).json(data);
  } catch (err) {
    // Enhanced error with context
    const error = err as Error;
    error.message = `Failed to fetch popular movies: ${error.message}`;
    (error as any).context = { page, language, endpoint: 'popular' };
    next(error);
  }
};

export const searchMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = ((req.query.query as string) || "").toLowerCase().trim();
    const page = Number(req.query.page) || 1;

    if (!query) {
      const error = new Error("Query parameter required");
      (error as any).statusCode = 400;
      (error as any).context = { endpoint: 'search', missingParam: 'query' };
      throw error;
    }

    const cacheKey = `searchMovies:${encodeURIComponent(query)}:${page}`;
    const cacheHelper = AdvancedCachingHelper.getInstance(cacheKey);

    // Try to respond with cached data
    if (cacheHelper.respondWithCache(res, {
      maxAge: 1800, // 30 minutes for search results
      staleWhileRevalidate: true
    })) {
      return;
    }

    const result = await searchMoviesByTitle(query, page);
    
    // Cache search results with shorter TTL
    cacheHelper.setToCache(result, {
      ttl: 1800, // 30 minutes
      tags: ['movies', 'search', `query:${query}`, `page:${page}`],
      staleWhileRevalidate: true
    });

    res.set({
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600',
      'X-Cache': 'MISS'
    });
    res.status(200).json(result);
  } catch (err) {
    // Enhanced error with context
    const error = err as Error;
    if (!(error as any).statusCode) {
      error.message = `Failed to search movies: ${error.message}`;
      (error as any).context = { 
        query: req.query.query, 
        page: req.query.page, 
        endpoint: 'search' 
      };
    }
    next(error);
  }
};

// Cache management endpoints
export const invalidateCache = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { tag } = req.params;
    
    if (!tag) {
      const error = new Error("Tag parameter required");
      (error as any).statusCode = 400;
      throw error;
    }

    const invalidatedCount = AdvancedCachingHelper.invalidateByTag(tag);
    
    res.status(200).json({
      message: `Cache invalidated for tag: ${tag}`,
      invalidatedKeys: invalidatedCount
    });
  } catch (err) {
    next(err);
  }
};

export const getCacheStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = AdvancedCachingHelper.getCacheStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};