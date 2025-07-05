import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import PaginationSkeletonComponent from '../pagination-skeleton'

describe('PaginationSkeletonComponent', () => {
  it('should render skeleton elements for desktop', () => {
    render(<PaginationSkeletonComponent isMobile={false} />)
    
    // Should render 7 skeleton elements for desktop
    const skeletons = screen.getAllByTestId(/skeleton/)
    expect(skeletons).toHaveLength(7)
  })

  it('should render skeleton elements for mobile', () => {
    render(<PaginationSkeletonComponent isMobile={true} />)
    
    // Should render 4 skeleton elements for mobile
    const skeletons = screen.getAllByTestId(/skeleton/)
    expect(skeletons).toHaveLength(4)
  })

  it('should have proper container styling', () => {
    const { container } = render(<PaginationSkeletonComponent isMobile={false} />)
    
    const stackContainer = container.querySelector('.MuiStack-root')
    expect(stackContainer).toBeInTheDocument()
  })
})