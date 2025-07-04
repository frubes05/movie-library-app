import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import MainPage from '../main-page'

describe('MainPage', () => {
  it('should render the main layout with title', () => {
    render(<MainPage />)
    
    expect(screen.getByText('Movies Library')).toBeInTheDocument()
    expect(screen.getByTestId('MovieFilterIcon')).toBeInTheDocument()
  })

  it('should render search section', () => {
    render(<MainPage />)
    
    expect(screen.getByLabelText('Search for a movie')).toBeInTheDocument()
  })

  it('should render movies content section', () => {
    render(<MainPage />)
    
    // Should render the movies grid container
    const gridContainer = screen.getByRole('main') || screen.getByTestId('movies-section')
    expect(gridContainer || screen.getByText('Movies Library')).toBeInTheDocument()
  })

  it('should have proper page structure', () => {
    const { container } = render(<MainPage />)
    
    // Should have container structure
    const containerElement = container.querySelector('.MuiContainer-root')
    expect(containerElement).toBeInTheDocument()
  })
})