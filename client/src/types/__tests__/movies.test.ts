import { describe, it, expect } from 'vitest'
import type { IPopularMoviesResponseResult, IPopularMoviesResponse } from '../movies'

describe('Movie Types', () => {
  it('should define IPopularMoviesResponseResult interface', () => {
    const mockMovie: IPopularMoviesResponseResult = {
      id: 1,
      title: 'Test Movie',
      original_title: 'Test Movie',
      original_language: 'en',
      overview: 'Test overview',
      release_date: '2023-01-01',
      poster_path: '/test.jpg',
      backdrop_path: '/test-backdrop.jpg',
      genre_ids: [1, 2, 3],
      popularity: 100,
      vote_average: 7.5,
      vote_count: 1000,
      video: false,
      adult: false,
    }

    expect(mockMovie.id).toBe(1)
    expect(mockMovie.title).toBe('Test Movie')
  })

  it('should define IPopularMoviesResponse interface', () => {
    const mockResponse: IPopularMoviesResponse = {
      page: 1,
      results: [],
      total_pages: 10,
      total_results: 200,
    }

    expect(mockResponse.page).toBe(1)
    expect(Array.isArray(mockResponse.results)).toBe(true)
  })
})