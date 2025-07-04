import { describe, it, expect } from 'vitest'

describe('Utils Index', () => {
  it('should export date utilities', async () => {
    const dateUtils = await import('../date-util')
    expect(dateUtils.formatDateWithSuffix).toBeDefined()
  })
})