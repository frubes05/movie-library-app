import { fetchPopularMovies, searchMoviesByTitle } from '../../services'

// Mock fetch globally
global.fetch = jest.fn()
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>

describe('Movie Services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.TMDB_BASE_URL = 'https://api.themoviedb.org/3'
    process.env.TMDB_API_KEY = 'test-api-key'
  })

  describe('fetchPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Popular Movie',
            overview: 'Popular movie overview',
            release_date: '2023-01-01',
          },
        ],
        total_pages: 10,
        total_results: 200,
      }

      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      const result = await fetchPopularMovies({ page: 1, language: 'en-US' })

      expect(result).toEqual(mockResponse)
      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/popular?api_key=test-api-key&page=1&language=en-US'
      )
    })

    it('should handle different page and language parameters', async () => {
      const mockResponse = { page: 2, results: [] }

      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      await fetchPopularMovies({ page: 2, language: 'fr-FR' })

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/popular?api_key=test-api-key&page=2&language=fr-FR'
      )
    })

    it('should throw error when fetch fails', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(
        fetchPopularMovies({ page: 1, language: 'en-US' })
      ).rejects.toThrow('Network error')
    })

    it('should handle API response errors', async () => {
      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValue(new Error('JSON parse error')),
      } as any)

      await expect(
        fetchPopularMovies({ page: 1, language: 'en-US' })
      ).rejects.toThrow('JSON parse error')
    })
  })

  describe('searchMoviesByTitle', () => {
    it('should search movies by title successfully', async () => {
      const mockResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: 'Search Result',
            overview: 'Search result overview',
          },
        ],
        total_pages: 5,
        total_results: 100,
      }

      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      const result = await searchMoviesByTitle('test movie', 1)

      expect(result).toEqual(mockResponse)
      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=test-api-key&language=en-US&query=test%20movie&page=1'
      )
    })

    it('should handle special characters in query', async () => {
      const mockResponse = { page: 1, results: [] }

      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      await searchMoviesByTitle('test & movie!', 2)

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=test-api-key&language=en-US&query=test%20%26%20movie!&page=2'
      )
    })

    it('should handle empty query string', async () => {
      const mockResponse = { page: 1, results: [] }

      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      await searchMoviesByTitle('', 1)

      expect(mockedFetch).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=test-api-key&language=en-US&query=&page=1'
      )
    })

    it('should throw error when fetch fails', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Search error'))

      await expect(searchMoviesByTitle('test', 1)).rejects.toThrow('Search error')
    })

    it('should handle API response errors', async () => {
      mockedFetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValue(new Error('JSON parse error')),
      } as any)

      await expect(searchMoviesByTitle('test', 1)).rejects.toThrow('JSON parse error')
    })
  })
})