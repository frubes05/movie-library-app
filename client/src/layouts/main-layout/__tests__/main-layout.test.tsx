import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import MainLayout from '../main-layout'

describe('MainLayout', () => {
  const mockContent = <div data-testid="test-content">Test Content</div>

  it('should render content without title or search section', () => {
    render(<MainLayout content={mockContent} />)
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('should render title with movie icon when provided', () => {
    render(<MainLayout title="Test Title" content={mockContent} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByTestId('MovieFilterIcon')).toBeInTheDocument()
  })

  it('should render search section when provided', () => {
    const searchSection = <div data-testid="search-section">Search</div>
    
    render(
      <MainLayout 
        title="Test Title" 
        searchSection={searchSection} 
        content={mockContent} 
      />
    )
    
    expect(screen.getByTestId('search-section')).toBeInTheDocument()
  })

  it('should not render title section when title is not provided', () => {
    render(<MainLayout content={mockContent} />)
    
    expect(screen.queryByTestId('MovieFilterIcon')).not.toBeInTheDocument()
  })

  it('should not render search section when not provided', () => {
    render(<MainLayout title="Test Title" content={mockContent} />)
    
    expect(screen.queryByTestId('search-section')).not.toBeInTheDocument()
  })

  it('should have proper container structure', () => {
    const { container } = render(<MainLayout content={mockContent} />)
    
    const containerElement = container.querySelector('.MuiContainer-root')
    expect(containerElement).toBeInTheDocument()
  })
})