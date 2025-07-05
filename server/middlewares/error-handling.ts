import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
  context?: Record<string, any>;
  isOperational?: boolean;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default error properties
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;
  
  // Log error for monitoring
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    statusCode,
    stack: err.stack,
    context: err.context,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Determine error type and message
  let errorMessage = "Something went wrong on the server.";
  let errorType = "INTERNAL_SERVER_ERROR";

  if (statusCode === 400) {
    errorMessage = err.message || "Bad request";
    errorType = "BAD_REQUEST";
  } else if (statusCode === 404) {
    errorMessage = "Resource not found";
    errorType = "NOT_FOUND";
  } else if (statusCode === 429) {
    errorMessage = "Too many requests";
    errorType = "RATE_LIMIT_EXCEEDED";
  } else if (statusCode >= 500) {
    errorType = "INTERNAL_SERVER_ERROR";
    // Don't expose internal errors in production
    if (process.env.NODE_ENV === "production" && !isOperational) {
      errorMessage = "Something went wrong on the server.";
    } else {
      errorMessage = err.message || errorMessage;
    }
  }

  // Response structure
  const errorResponse: any = {
    error: {
      message: errorMessage,
      type: errorType,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url
    }
  };

  // Add context in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.error.details = err.message;
    errorResponse.error.context = err.context;
    errorResponse.error.stack = err.stack;
  }

  // Add request ID if available
  if (req.headers['x-request-id']) {
    errorResponse.error.requestId = req.headers['x-request-id'];
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: ApiError = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  error.isOperational = true;
  error.context = {
    method: req.method,
    url: req.originalUrl
  };
  next(error);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};