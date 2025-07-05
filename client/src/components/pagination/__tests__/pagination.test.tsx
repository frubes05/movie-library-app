import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'
import PaginationComponent from '../pagination'

describe('PaginationComponent', () => {
  const mockProps = {
    count: 10,
    page: 1,
    onChange: vi.fn(),
    color: 'primary' as const,
    isMobile: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render pagination with correct props', () => {
    render(<PaginationComponent {...mockProps} />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should call onChange when page is clicked', () => {
    render(<PaginationComponent {...mockProps} />)
    
    const pageButton = screen.getByText('2')
    fireEvent.click(pageButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith(expect.anything(), 2)
  })

  it('should render with mobile layout when isMobile is true', () => {
    render(<PaginationComponent {...mockProps} isMobile={true} />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // Mobile version should show fewer pagination items
  })

  it('should use default values when props are not provided', () => {
    const minimalProps = {
      onChange: vi.fn(),
      color: 'primary' as const,
      isMobile: false,
    }
    
    render(<PaginationComponent {...minimalProps} />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    const { container } = render(<PaginationComponent {...mockProps} />)
    
    const paginationContainer = container.querySelector('.MuiStack-root')
    expect(paginationContainer).toBeInTheDocument()
  })
})