import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGlobalContext } from '../use-global-context'
import { GlobalContext } from '../../../context/global/context'

describe('useGlobalContext', () => {
  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useGlobalContext())
    }).toThrow('useMovieContext must be used inside MovieProvider')
  })

  it('should return context when used inside provider', () => {
    const mockContextValue = {
      searchQuery: 'test',
      page: 1,
      onPageChange: vi.fn(),
      onInputChange: vi.fn(),
      onSubmitSearch: vi.fn(),
      isMobile: false,
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GlobalContext.Provider value={mockContextValue}>
        {children}
      </GlobalContext.Provider>
    )

    const { result } = renderHook(() => useGlobalContext(), { wrapper })

    expect(result.current).toEqual(mockContextValue)
  })
})