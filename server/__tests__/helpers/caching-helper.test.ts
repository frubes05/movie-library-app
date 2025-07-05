import { CachingHelper } from '../../helpers'
import { cache } from '../../cache'
import { Response } from 'express'

// Mock the cache module
jest.mock('../../cache', () => ({
  cache: {
    get: jest.fn(),
    set: jest.fn(),
  },
}))

const mockedCache = cache as jest.Mocked<typeof cache>

describe('CachingHelper', () => {
  let cachingHelper: CachingHelper
  let mockResponse: Partial<Response>

  beforeEach(() => {
    jest.clearAllMocks()
    cachingHelper = CachingHelper.getInstance('test-key')
    mockResponse = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  describe('getInstance', () => {
    it('should return the same instance for the same key', () => {
      const instance1 = CachingHelper.getInstance('same-key')
      const instance2 = CachingHelper.getInstance('same-key')

      expect(instance1).toBe(instance2)
    })

    it('should return different instances for different keys', () => {
      const instance1 = CachingHelper.getInstance('key1')
      const instance2 = CachingHelper.getInstance('key2')

      expect(instance1).not.toBe(instance2)
    })

    it('should maintain singleton pattern across multiple calls', () => {
      const instances = Array.from({ length: 5 }, () => 
        CachingHelper.getInstance('singleton-test')
      )

      const firstInstance = instances[0]
      instances.forEach(instance => {
        expect(instance).toBe(firstInstance)
      })
    })
  })

  describe('getFromCache', () => {
    it('should return cached data when available', () => {
      const testData = { test: 'data' }
      mockedCache.get.mockReturnValue(testData)

      const result = cachingHelper.getFromCache()

      expect(result).toEqual(testData)
      expect(mockedCache.get).toHaveBeenCalledWith('test-key')
    })

    it('should return undefined when no cached data', () => {
      mockedCache.get.mockReturnValue(undefined)

      const result = cachingHelper.getFromCache()

      expect(result).toBeUndefined()
      expect(mockedCache.get).toHaveBeenCalledWith('test-key')
    })

    it('should handle complex data types', () => {
      const complexData = {
        movies: [{ id: 1, title: 'Test' }],
        pagination: { page: 1, total: 100 },
        metadata: { timestamp: Date.now() }
      }
      mockedCache.get.mockReturnValue(complexData)

      const result = cachingHelper.getFromCache()

      expect(result).toEqual(complexData)
    })
  })

  describe('setToCache', () => {
    it('should set data to cache without TTL', () => {
      const testData = { test: 'data' }

      cachingHelper.setToCache(testData)

      expect(mockedCache.set).toHaveBeenCalledWith('test-key', testData)
    })

    it('should set data to cache with TTL', () => {
      const testData = { test: 'data' }
      const ttl = 1800

      cachingHelper.setToCache(testData, ttl)

      expect(mockedCache.set).toHaveBeenCalledWith('test-key', testData, ttl)
    })

    it('should handle null and undefined values', () => {
      cachingHelper.setToCache(null)
      expect(mockedCache.set).toHaveBeenCalledWith('test-key', null)

      cachingHelper.setToCache(undefined)
      expect(mockedCache.set).toHaveBeenCalledWith('test-key', undefined)
    })

    it('should handle different TTL values', () => {
      const testData = { test: 'data' }
      
      cachingHelper.setToCache(testData, 0)
      expect(mockedCache.set).toHaveBeenCalledWith('test-key', testData, 0)

      cachingHelper.setToCache(testData, 3600)
      expect(mockedCache.set).toHaveBeenCalledWith('test-key', testData, 3600)
    })
  })

  describe('respondWithCache', () => {
    it('should respond with cached data when available', () => {
      const testData = { test: 'data' }
      mockedCache.get.mockReturnValue(testData)

      const result = cachingHelper.respondWithCache(mockResponse as Response)

      expect(result).toBe(true)
      expect(mockResponse.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=3600')
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalledWith(testData)
    })

    it('should respond with cached data using custom maxAge', () => {
      const testData = { test: 'data' }
      mockedCache.get.mockReturnValue(testData)

      const result = cachingHelper.respondWithCache(mockResponse as Response, 7200)

      expect(result).toBe(true)
      expect(mockResponse.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=7200')
    })

    it('should return false when no cached data available', () => {
      mockedCache.get.mockReturnValue(undefined)

      const result = cachingHelper.respondWithCache(mockResponse as Response)

      expect(result).toBe(false)
      expect(mockResponse.set).not.toHaveBeenCalled()
      expect(mockResponse.status).not.toHaveBeenCalled()
      expect(mockResponse.json).not.toHaveBeenCalled()
    })

    it('should handle different maxAge values', () => {
      const testData = { test: 'data' }
      mockedCache.get.mockReturnValue(testData)

      cachingHelper.respondWithCache(mockResponse as Response, 1800)
      expect(mockResponse.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=1800')

      cachingHelper.respondWithCache(mockResponse as Response, 0)
      expect(mockResponse.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=0')
    })
  })
})