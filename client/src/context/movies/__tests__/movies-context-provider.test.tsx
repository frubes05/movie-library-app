import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MoviesContextProvider } from '../provider/movies-context-provider'
import { useMoviesContext } from '../../../hooks/movies'
import { moviesApi } from '../../../store/apis'

// Mock the API hooks
vi.mock('../../../store/apis', () => ({
  moviesApi: {
    reducer: vi.fn(),
    middleware: vi.fn(),
  },
  useGetPopularMoviesQuery: vi.fn(),
  useSearchMoviesQuery: vi.fn(),
}))

const createTestStore = () => {
  return configureStore({
    reducer: {
      [moviesApi.reducerPath]: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  })
}

describe('MoviesContextProvider', () => {
  const mockMovieData = {
    page: 1,
    isSearching: false,
    searchQuery: '',
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createTestStore()
    return (
      <Provider store={store}>
        <MoviesContextProvider movieData={mockMovieData}>
          {children}
        </MoviesContextProvider>
      </Provider>
    )
  }

  it('should provide movies context', () => {
    const { result } = renderHook(() => useMoviesContext(), { wrapper })

    expect(result.current).toBeDefined()
    expect(typeof result.current.movies).toBeDefined()
    expect(typeof result.current.isLoading).toBe('boolean')
  })

  it('should handle search mode correctly', () => {
    const searchMovieData = {
      page: 1,
      isSearching: true,
      searchQuery: 'test',
    }

    const searchWrapper = ({ children }: { children: React.ReactNode }) => {
      const store = createTestStore()
      return (
        <Provider store={store}>
          <MoviesContextProvider movieData={searchMovieData}>
            {children}
          </MoviesContextProvider>
        </Provider>
      )
    }

    const { result } = renderHook(() => useMoviesContext(), { wrapper: searchWrapper })

    expect(result.current).toBeDefined()
  })
})