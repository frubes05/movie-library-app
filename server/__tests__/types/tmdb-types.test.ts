import { TMDBResponse } from '../../types'

describe('TMDB Types', () => {
  describe('TMDBResponse', () => {
    it('should have results property', () => {
      const response: TMDBResponse = {
        results: [
          { id: 1, title: 'Test Movie' },
          { id: 2, title: 'Another Movie' }
        ]
      }

      expect(response.results).toBeDefined()
      expect(Array.isArray(response.results)).toBe(true)
      expect(response.results).toHaveLength(2)
    })

    it('should allow empty results array', () => {
      const response: TMDBResponse = {
        results: []
      }

      expect(response.results).toBeDefined()
      expect(Array.isArray(response.results)).toBe(true)
      expect(response.results).toHaveLength(0)
    })

    it('should allow any type in results array', () => {
      const response: TMDBResponse = {
        results: [
          { id: 1, title: 'Movie' },
          { id: 2, name: 'TV Show' },
          'string item',
          123,
          { custom: 'object' }
        ]
      }

      expect(response.results).toHaveLength(5)
      expect(typeof response.results[0]).toBe('object')
      expect(typeof response.results[2]).toBe('string')
      expect(typeof response.results[3]).toBe('number')
    })
  })
})