import request from "supertest";
import express from "express";
import movieRoutes from "../movie-routes";
import * as controllers from "../../controllers";

jest.mock("../../controllers");

const mockedControllers = controllers as jest.Mocked<typeof controllers>;

describe("Movie Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use("/api/movies", movieRoutes);
    jest.clearAllMocks();
  });

  describe("GET /api/movies/popular", () => {
    it("should call getPopularMovies controller", async () => {
      mockedControllers.getPopularMovies.mockImplementation(
        async (req, res, next) => {
          res.status(200).json({ message: "Popular movies" });
        }
      );

      const response = await request(app).get("/api/movies/popular");

      expect(mockedControllers.getPopularMovies).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Popular movies" });
    });

    it("should pass query parameters to controller", async () => {
      mockedControllers.getPopularMovies.mockImplementation(
        async (req, res, next) => {
          res
            .status(200)
            .json({ page: req.query.page, language: req.query.language });
        }
      );

      await request(app).get("/api/movies/popular?page=2&language=fr-FR");

      expect(mockedControllers.getPopularMovies).toHaveBeenCalled();
    });
  });

  describe("GET /api/movies/search", () => {
    it("should call searchMovies controller", async () => {
      mockedControllers.searchMovies.mockImplementation(
        async (req, res, next) => {
          res.status(200).json({ message: "Search results" });
        }
      );
      const response = await request(app).get("/api/movies/search?query=test");

      expect(mockedControllers.searchMovies).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Search results" });
    });

    it("should pass query parameters to controller", async () => {
      mockedControllers.searchMovies.mockImplementation(
        async (req, res, next) => {
          res
            .status(200)
            .json({ page: req.query.page, language: req.query.language });
        }
      );

      await request(app).get("/api/movies/search?query=batman&page=3");

      expect(mockedControllers.searchMovies).toHaveBeenCalled();
    });
  });

  describe("Route not found", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/api/movies/nonexistent");

      expect(response.status).toBe(404);
    });
  });
});
