import { cache } from '../cache'

describe('Cache Module', () => {
  beforeEach(() => {
    // Clear cache before each test
    cache.flushAll()
  })

  afterEach(() => {
    // Clean up after each test
    cache.flushAll()
  })

  it('should be able to set and get values', () => {
    const key = 'test-key'
    const value = { data: 'test-data' }

    cache.set(key, value)
    const result = cache.get(key)

    expect(result).toEqual(value)
  })

  it('should return undefined for non-existent keys', () => {
    const result = cache.get('non-existent-key')
    expect(result).toBeUndefined()
  })

  it('should handle TTL (Time To Live)', (done) => {
    const key = 'ttl-test'
    const value = 'test-value'
    const ttl = 1 // 1 second

    cache.set(key, value, ttl)
    
    // Should exist immediately
    expect(cache.get(key)).toBe(value)

    // Should expire after TTL
    setTimeout(() => {
      expect(cache.get(key)).toBeUndefined()
      done()
    }, 1100) // Wait slightly longer than TTL
  })

  it('should be able to delete specific keys', () => {
    const key = 'delete-test'
    const value = 'test-value'

    cache.set(key, value)
    expect(cache.get(key)).toBe(value)

    cache.del(key)
    expect(cache.get(key)).toBeUndefined()
  })

  it('should be able to flush all cache', () => {
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    cache.set('key3', 'value3')

    expect(cache.get('key1')).toBe('value1')
    expect(cache.get('key2')).toBe('value2')
    expect(cache.get('key3')).toBe('value3')

    cache.flushAll()

    expect(cache.get('key1')).toBeUndefined()
    expect(cache.get('key2')).toBeUndefined()
    expect(cache.get('key3')).toBeUndefined()
  })

  it('should handle complex data types', () => {
    const complexData = {
      movies: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' }
      ],
      pagination: {
        page: 1,
        total_pages: 10,
        total_results: 200
      },
      metadata: {
        timestamp: Date.now(),
        source: 'TMDB'
      }
    }

    cache.set('complex-data', complexData)
    const result = cache.get('complex-data')

    expect(result).toEqual(complexData)
  })

  it('should handle array data', () => {
    const arrayData = [1, 2, 3, 'test', { nested: 'object' }]

    cache.set('array-data', arrayData)
    const result = cache.get('array-data')

    expect(result).toEqual(arrayData)
  })

  it('should handle null and undefined values', () => {
    cache.set('null-value', null)
    cache.set('undefined-value', undefined)

    expect(cache.get('null-value')).toBeNull()
    expect(cache.get('undefined-value')).toBeUndefined()
  })
})