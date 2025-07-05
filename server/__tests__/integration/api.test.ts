import request from 'supertest'
import express from 'express'
import cors from 'cors'
import movieRoutes from '../../routes'
import { errorHandler } from '../../middlewares'

// Mock external dependencies
jest.mock('../../services')
jest.mock('../../helpers')

import * as services from '../../services'
import { CachingHelper } from '../../helpers'

const mockedServices = services as jest.Mocked<typeof services>
const mockedCachingHelper = CachingHelper as jest.MockedClass<typeof CachingHelper>

describe('API Integration Tests', () => {
  let app: express.Application

  beforeEach(() => {
    // Create app similar to main index.ts
    app = express()
    app.use(cors())
    app.use('/api/movies', movieRoutes)
    app.use(errorHandler)
    
    jest.clearAllMocks()
  })

  describe('Popular Movies API', () => {
    it('should return popular movies with proper headers', async () => {
      const mockData = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Integration Test Movie',
            overview: 'Test overview',
            release_date: '2023-01-01',
          },
        ],
        total_pages: 10,
        total_results: 200,
      }

      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockResolvedValue(mockData)

      const response = await request(app)
        .get('/api/movies/popular')
        .expect(200)

      expect(response.body).toEqual(mockData)
      expect(response.headers['cache-control']).toBe('public, max-age=3600')
      expect(response.headers['access-control-allow-origin']).toBe('*')
    })

    it('should handle pagination correctly', async () => {
      const mockData = { page: 5, results: [] }
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockResolvedValue(mockData)

      await request(app)
        .get('/api/movies/popular?page=5&language=es-ES')
        .expect(200)

      expect(mockedServices.fetchPopularMovies).toHaveBeenCalledWith({
        page: 5,
        language: 'es-ES',
      })
    })
  })

  describe('Search Movies API', () => {
    it('should search movies and return results', async () => {
      const mockData = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Batman',
            overview: 'The Dark Knight',
          },
        ],
        total_pages: 5,
        total_results: 100,
      }

      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.searchMoviesByTitle.mockResolvedValue(mockData)

      const response = await request(app)
        .get('/api/movies/search?query=batman')
        .expect(200)

      expect(response.body).toEqual(mockData)
      expect(mockedServices.searchMoviesByTitle).toHaveBeenCalledWith('batman', 1)
    })

    it('should validate required query parameter', async () => {
      const response = await request(app)
        .get('/api/movies/search')
        .expect(400)

      expect(response.body).toEqual({ error: 'Query parameter required' })
    })
  })

  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockRejectedValue(new Error('TMDB API Error'))

      const response = await request(app)
        .get('/api/movies/popular')
        .expect(500)

      expect(response.body).toHaveProperty('error', 'Something went wrong on the server.')
    })

    it('should handle 404 for non-existent endpoints', async () => {
      await request(app)
        .get('/api/movies/nonexistent')
        .expect(404)
    })
  })

  describe('CORS Headers', () => {
    it('should include proper CORS headers', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockResolvedValue({ results: [] })

      const response = await request(app)
        .get('/api/movies/popular')
        .expect(200)

      expect(response.headers['access-control-allow-origin']).toBe('*')
    })

    it('should handle OPTIONS requests', async () => {
      await request(app)
        .options('/api/movies/popular')
        .expect(204)
    })
  })
})