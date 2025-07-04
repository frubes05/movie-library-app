import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import SearchWrapper from '../search-wrapper'
import * as moviesHook from '../../../../hooks/movies'

// Mock the movies context hook
vi.mock('../../../../hooks/movies')
const mockedUseMoviesContext = vi.mocked(moviesHook.useMoviesContext)

describe('SearchWrapper', () => {
  const mockProps = {
    query: 'test query',
    onInputChange: vi.fn(),
    onSubmitSearch: vi.fn(),
    isMobile: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search form when not loading', () => {
    mockedUseMoviesContext.mockReturnValue({
      isLoading: false,
    })

    render(<SearchWrapper {...mockProps} />)

    expect(screen.getByLabelText('Search for a movie')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should render search skeleton when loading', () => {
    mockedUseMoviesContext.mockReturnValue({
      isLoading: true,
    })

    render(<SearchWrapper {...mockProps} />)

    // Should render skeleton instead of actual form
    expect(screen.queryByLabelText('Search for a movie')).not.toBeInTheDocument()
    
    // Check for skeleton elements
    const skeletons = screen.getAllByTestId(/skeleton/)
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should pass props correctly to SearchForm', () => {
    mockedUseMoviesContext.mockReturnValue({
      isLoading: false,
    })

    render(<SearchWrapper {...mockProps} />)

    const searchInput = screen.getByLabelText('Search for a movie')
    expect(searchInput).toHaveValue('test query')
  })
})