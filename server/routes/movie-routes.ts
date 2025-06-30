import { Router } from "express";
import { getPopularMovies, searchMovies } from "../controllers";

const router = Router();

router.get("/popular", getPopularMovies);
router.get("/search", searchMovies);

export default router;
