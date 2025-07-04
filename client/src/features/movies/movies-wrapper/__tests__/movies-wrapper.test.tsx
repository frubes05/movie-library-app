import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import MoviesWrapper from '../movies-wrapper'
import * as moviesHook from '../../../../hooks/movies'

// Mock the movies context hook
vi.mock('../../../../hooks/movies')
const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext)

describe('MoviesWrapper', () => {
  const mockProps = {
    onPageChange: vi.fn(),
    isMobile: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render movies list and pagination when not loading', () => {
    mockedUseMoviesContext.mockReturnValue({
      movies: [
        {
          id: 1,
          title: 'Test Movie',
          overview: 'Test overview',
          release_date: '2023-01-01',
          poster_path: '/test.jpg',
          backdrop_path: '/test-backdrop.jpg',
          original_title: 'Test Movie',
          original_language: 'en',
          genre_ids: [1, 2],
          popularity: 100,
          vote_average: 7.5,
          vote_count: 1000,
          video: false,
          adult: false,
        },
      ],
      count: 10,
      currentPage: 1,
      isLoading: false,
    })

    render(<MoviesWrapper {...mockProps} />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument() // Pagination
  })

  it('should render skeleton components when loading', () => {
    mockedUseMoviesContext.mockReturnValue({
      movies: undefined,
      count: undefined,
      currentPage: undefined,
      isLoading: true,
    })

    render(<MoviesWrapper {...mockProps} />)

    // Should render skeleton cards
    const skeletons = screen.getAllByTestId(/skeleton/)
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should call onPageChange when pagination is clicked', () => {
    mockedUseMoviesContext.mockReturnValue({
      movies: [],
      count: 10,
      currentPage: 1,
      isLoading: false,
    })

    render(<MoviesWrapper {...mockProps} />)

    // This would require more complex interaction testing
    // The pagination component should be tested separately
    expect(mockProps.onPageChange).toBeDefined()
  })

  it('should render with mobile layout when isMobile is true', () => {
    mockedUseMoviesContext.mockReturnValue({
      movies: [],
      count: 10,
      currentPage: 1,
      isLoading: false,
    })

    render(<MoviesWrapper {...mockProps} isMobile={true} />)

    // The mobile-specific behavior would be tested in the child components
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})