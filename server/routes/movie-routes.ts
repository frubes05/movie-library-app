import { Router } from "express";
import { 
  getPopularMovies, 
  searchMovies, 
  invalidateCache, 
  getCacheStats 
} from "../controllers";
import { asyncHandler } from "../middlewares/error-handling";

const router = Router();

// Movie endpoints
router.get("/popular", asyncHandler(getPopularMovies));
router.get("/search", asyncHandler(searchMovies));

// Cache management endpoints (for admin/development)
router.delete("/cache/:tag", asyncHandler(invalidateCache));
router.get("/cache/stats", asyncHandler(getCacheStats));

export default router;