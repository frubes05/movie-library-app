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
  })
})