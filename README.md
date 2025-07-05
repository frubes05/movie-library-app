# Movies Library

A full-stack movies library application built with React, TypeScript, Node.js, and Express. The application allows users to browse popular movies and search for specific titles using The Movie Database (TMDB) API.

UI (Frontend): https://frubes05.github.io/movie-library-app/
Server (Backed): https://movie-library-app-08vs.onrender.com/ (Can be stale as I am using Free-Tier version)

## Features

- **Browse Popular Movies**: View trending and popular movies with pagination
- **Search Functionality**: Search for movies by title with real-time results
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Caching**: Server-side caching for improved performance
- **Modern UI**: Clean, Material-UI based interface with hover effects and animations
- **Rating System**: Visual rating badges with color-coded scores
- **SEO System**: Implemented custom SEO system as react-helmet-async is not yet supported for react v19.0.0

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Material-UI (MUI)** for components and styling
- **Redux Toolkit** with RTK Query for state management
- **React Router** for navigation
- **React Hook Form** for form handling
- **Vite** for build tooling

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Node-Cache** for in-memory caching
- **CORS** for cross-origin requests

### Testing

- **Vitest** and **React Testing Library** for frontend testing
- **Jest** and **Supertest** for backend testing
- Comprehensive test coverage for components, hooks, services, and API endpoints

## Project Structure

![Code Structure 1](https://frubes05.github.io/movie-library-app/code-structure-01.png)
![Code Structure 2](https://frubes05.github.io/movie-library-app/code-structure-02.png)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDB API key (get one at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movies-library
   ```

2. **Install dependencies**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the server directory:

   ```env
   PORT=9000
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   NODE_ENV=development
   ```

4. **Start the development servers**

   Terminal 1 (Backend):

   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 (Frontend):

   ```bash
   cd client
   npm run dev
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:9000

## Testing

### Frontend Tests

```bash
cd client

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Backend Tests

```bash
cd server

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Movies API

- `GET /api/movies/popular?page=1&language=en-US` - Get popular movies
- `GET /api/movies/search?query=movie&page=1` - Search movies by title

## Key Features Implementation

### Caching Strategy

- Server-side caching using Node-Cache with 1-hour TTL
- Singleton pattern for cache management
- Automatic cache key generation based on request parameters

### Responsive Design

- Mobile-first approach with Material-UI breakpoints
- Custom hooks for responsive behavior
- Optimized layouts for different screen sizes

### State Management

- Redux Toolkit for global state
- RTK Query for API data fetching and caching
- React Context for UI state and user interactions

## Testing Strategy

### Frontend Testing

- **Unit Tests**: Individual components and utilities
- **Mocking**: External dependencies and API calls
- **Coverage**: Comprehensive test coverage for critical paths

### Backend Testing

- **Unit Tests**: Controllers, services, and helpers
- **Mocking**: External API calls and dependencies

## Performance Optimizations

- **Lazy Loading**: Code splitting for better initial load times
- **Caching**: Both client-side (RTK Query) and server-side caching
- **Image Optimization**: Responsive images with fallbacks (Maybe would use better one next time)
- **Pagination**: Efficient data loading with pagination

## Key Improvement Areas (The ones I did not do, but would be added next)

- **Setup Aliases in tsconfig.json**: For both frontend and backend (also make everything barrel exported)
- **Global Error Handling**: On backend there is an error handler, but on frontend there needs to be global error handling context + toast message(snackbar) system
- **Input Validation and sanitization**: Using Zod ili Yup resolvers with react-hook-form (schema-based validation) as well as sanitizing input to prevent SQL injection attacks
- **Rate limiter in backend**: Prevent abuse and accidental DDoS by limiting repeated API hits from the same IP.
- **Movie Details**: Expand functionality with information about movie: cast, trailers, reviews, and recommendations (modal or custom page).
- **More Reusable components**: Abstract shared UI elements like buttons, modals, loaders, and toasts for consistency
- **Add Docker image**: For both directories use Docker compose
- **Routing (if multiple pages)**: Definitely nice to have, but for simple app like this it's not needed
- **Normalization of data**: In this app was not needed, but usually if backend response is too large or too broad, some normalization of response would be optimal
