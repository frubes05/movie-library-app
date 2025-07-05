import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../error-handling";

describe("Error Handler Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it("should return 500 status with generic error message", () => {
    const error = new Error("Test error");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: undefined,
    });
  });

  it("should include error details in development environment", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const error = new Error("Test error message");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: "Test error message",
    });

    process.env.NODE_ENV = originalEnv;
  });

  it("should not include error details in production environment", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const error = new Error("Test error message");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: undefined,
    });

    process.env.NODE_ENV = originalEnv;
  });

  it("should handle non-Error objects", () => {
    const error = "String error";

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: undefined,
    });
  });

  it("should handle null and undefined errors", () => {
    errorHandler(
      null,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: undefined,
    });

    errorHandler(
      undefined,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: undefined,
    });
  });

  it("should handle errors with custom properties", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const customError = {
      message: "Custom error message",
      statusCode: 404,
      customProperty: "custom value",
    };

    errorHandler(
      customError,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Something went wrong on the server.",
      details: "Custom error message",
    });

    process.env.NODE_ENV = originalEnv;
  });
});
