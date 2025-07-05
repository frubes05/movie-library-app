import { Request, Response } from 'express'

export const createMockRequest = (overrides: Partial<Request> = {}): Partial<Request> => ({
  query: {},
  params: {},
  body: {},
  headers: {},
  method: 'GET',
  url: '/',
  ...overrides,
})

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
  }
  return res
}

export const createMockNext = () => jest.fn()

export const mockTMDBResponse = {
  popular: {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Test Movie',
        overview: 'Test overview',
        release_date: '2023-01-01',
        poster_path: '/test.jpg',
        vote_average: 7.5,
      },
    ],
    total_pages: 10,
    total_results: 200,
  },
  search: {
    page: 1,
    results: [
      {
        id: 2,
        title: 'Search Result',
        overview: 'Search overview',
        release_date: '2023-02-01',
        poster_path: '/search.jpg',
        vote_average: 8.0,
      },
    ],
    total_pages: 5,
    total_results: 100,
  },
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))