// Global test setup
process.env.NODE_ENV = 'test'
process.env.TMDB_API_KEY = 'test-api-key'
process.env.TMDB_BASE_URL = 'https://api.themoviedb.org/3'
process.env.PORT = '9000'

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Global test utilities
global.createMockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
})

global.createMockRequest = (overrides = {}) => ({
  query: {},
  params: {},
  body: {},
  headers: {},
  ...overrides,
})

// Setup global fetch mock
global.fetch = jest.fn()

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})