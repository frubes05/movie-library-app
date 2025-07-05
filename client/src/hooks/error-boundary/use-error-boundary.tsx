import { useCallback } from "react";
import { useNotification } from "../../context/notification";

export const useErrorBoundary = () => {
  const { showNotification } = useNotification();

  const handleError = useCallback((error: Error, errorInfo?: any) => {
    console.error("Error caught by boundary:", error, errorInfo);
    
    // Show user-friendly error notification
    showNotification(
      "Something went wrong. Please try refreshing the page.",
      "error",
      8000
    );

    // Optional: Send error to monitoring service
    sendErrorToMonitoring(error, errorInfo);
  }, [showNotification]);

  const throwError = useCallback((error: string | Error) => {
    const errorObj = typeof error === "string" ? new Error(error) : error;
    throw errorObj;
  }, []);

  return { handleError, throwError };
};

// Helper function to send errors to monitoring service
function sendErrorToMonitoring(error: Error, errorInfo?: any) {
  // In a real application, you would send this to a service like:
  // - Sentry
  // - LogRocket
  // - Bugsnag
  // - Custom logging endpoint
  
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    errorInfo,
  };

  console.log("Error monitoring data:", errorData);
  
  // Example: Send to monitoring service
  // fetch('/api/errors', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(errorData)
  // }).catch(console.error);
}