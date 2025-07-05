import { useCallback } from "react";
import { useNotification } from "../../context/notification";

export const useErrorBoundary = () => {
  const { showNotification } = useNotification();

  const handleError = useCallback((error: Error, errorInfo?: any) => {
    console.error("Error caught by boundary:", error, errorInfo);
    
    // Show user-friendly error notification
    showNotification(
      "Something went wrong. The page will reload automatically.",
      "error",
      8000
    );

    // Optional: Send error to monitoring service
    // sendErrorToMonitoring(error, errorInfo);

    // Reload page after a delay
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }, [showNotification]);

  return { handleError };
};