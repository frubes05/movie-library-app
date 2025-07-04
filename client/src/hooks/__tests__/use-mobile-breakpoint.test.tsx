import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMobileBreakpoint } from '../mobile-breakpoint'
import * as MUI from '@mui/material'

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    useTheme: vi.fn(),
  }
})

describe('useMobileBreakpoint', () => {
  const mockUseTheme = vi.mocked(MUI.useTheme)
  const mockUseMediaQuery = vi.mocked(MUI.useMediaQuery)

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      breakpoints: {
        down: vi.fn().mockReturnValue('(max-width:599.95px)'),
      },
    } as any)
  })

  it('should return true for mobile breakpoint', () => {
    mockUseMediaQuery.mockReturnValue(true)
    
    const { result } = renderHook(() => useMobileBreakpoint())
    
    expect(result.current).toBe(true)
  })

  it('should return false for desktop breakpoint', () => {
    mockUseMediaQuery.mockReturnValue(false)
    
    const { result } = renderHook(() => useMobileBreakpoint())
    
    expect(result.current).toBe(false)
  })
})