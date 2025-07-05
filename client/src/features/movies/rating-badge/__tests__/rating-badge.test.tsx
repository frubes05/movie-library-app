import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../../test/test-utils'
import RatingBadge from '../rating-badge'

describe('RatingBadge', () => {
  it('should render rating value correctly', () => {
    render(<RatingBadge rating={75} />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('should round rating value', () => {
    render(<RatingBadge rating={74.6} />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('should apply green color for high ratings (>=75)', () => {
    const { container } = render(<RatingBadge rating={85} />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveStyle({
      border: '3px solid #21d07a'
    })
  })

  it('should apply yellow color for medium ratings (50-74)', () => {
    const { container } = render(<RatingBadge rating={65} />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveStyle({
      border: '3px solid #d2d531'
    })
  })

  it('should apply red color for low ratings (<50)', () => {
    const { container } = render(<RatingBadge rating={35} />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveStyle({
      border: '3px solid #db2360'
    })
  })

  it('should have proper positioning styles', () => {
    const { container } = render(<RatingBadge rating={75} />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveStyle({
      position: 'absolute',
      top: '8px',
      left: '8px',
      'z-index': '2'
    })
  })
})