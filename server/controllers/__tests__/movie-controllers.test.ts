import request from 'supertest'
import express from 'express'
import { getPopularMovies, searchMovies } from '../movie-controllers'
import * as services from '../../services'
import { CachingHelper } from '../../helpers'

// Mock dependencies
jest.mock('../../services')
jest.mock('../../helpers')

const mockedServices = services as jest.Mocked<typeof services>
const mockedCachingHelper = CachingHelper as jest.MockedClass<typeof CachingHelper>

describe('Movie Controllers', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    jest.clearAllMocks()
  })

  describe('getPopularMovies', () => {
    beforeEach(() => {
      app.get('/popular', getPopularMovies)
    })

    it('should return popular movies successfully', async () => {
      const mockData = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
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

      const response = await request(app).get('/popular?page=1&language=en-US')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockData)
      expect(mockedServices.fetchPopularMovies).toHaveBeenCalledWith({
        page: 1,
        language: 'en-US',
      })
    })

    it('should return cached data when available', async () => {
      const mockData = { page: 1, results: [] }
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockImplementation((res) => {
          res.status(200).json(mockData)
          return true
        }),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)

      const response = await request(app).get('/popular')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockData)
      expect(mockedServices.fetchPopularMovies).not.toHaveBeenCalled()
    })

    it('should handle errors properly', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockRejectedValue(new Error('API Error'))

      // Add error handler middleware
      app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Something went wrong on the server.' })
      })

      const response = await request(app).get('/popular')

      expect(response.status).toBe(500)
      expect(response.body).toHaveProperty('error')
    })

    it('should use default values for missing query parameters', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.fetchPopularMovies.mockResolvedValue({ results: [] })

      await request(app).get('/popular')

      expect(mockedServices.fetchPopularMovies).toHaveBeenCalledWith({
        page: 1,
        language: 'en-US',
      })
    })
  })

  describe('searchMovies', () => {
    beforeEach(() => {
      app.get('/search', searchMovies)
    })

    it('should search movies successfully', async () => {
      const mockData = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Search Result Movie',
            overview: 'Search result overview',
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

      const response = await request(app).get('/search?query=test&page=1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockData)
      expect(mockedServices.searchMoviesByTitle).toHaveBeenCalledWith('test', 1)
    })

    it('should return 400 error when query parameter is missing', async () => {
      const response = await request(app).get('/search')

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Query parameter required' })
    })

    it('should return 400 error when query parameter is empty', async () => {
      const response = await request(app).get('/search?query=')

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Query parameter required' })
    })

    it('should convert query to lowercase', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.searchMoviesByTitle.mockResolvedValue({ results: [] })

      await request(app).get('/search?query=TEST%20MOVIE')

      expect(mockedServices.searchMoviesByTitle).toHaveBeenCalledWith('test movie', 1)
    })

    it('should use default page value when not provided', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.searchMoviesByTitle.mockResolvedValue({ results: [] })

      await request(app).get('/search?query=test')

      expect(mockedServices.searchMoviesByTitle).toHaveBeenCalledWith('test', 1)
    })

    it('should handle errors properly', async () => {
      const mockCacheInstance = {
        respondWithCache: jest.fn().mockReturnValue(false),
        setToCache: jest.fn(),
      }

      mockedCachingHelper.getInstance.mockReturnValue(mockCacheInstance as any)
      mockedServices.searchMoviesByTitle.mockRejectedValue(new Error('Search Error'))

      // Add error handler middleware
      app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).json({ error: 'Something went wrong on the server.' })
      })

      const response = await request(app).get('/search?query=test')

      expect(response.status).toBe(500)
      expect(response.body).toHaveProperty('error')
    })
  })
})