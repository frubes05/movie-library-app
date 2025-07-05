import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification";

export const useUrlValidation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const page = searchParams.get("page");
    const query = searchParams.get("query");

    if (page) {
      const pageNumber = parseInt(page, 10);
      
      // Check if page starts with minus sign or is negative
      if (page.startsWith("-") || pageNumber < 1) {
        showNotification(
          "Invalid page number. Redirecting to first page.",
          "warning",
          4000
        );
        
        // Redirect to first page, preserve query if exists
        const newParams = new URLSearchParams();
        if (query) {
          newParams.set("query", query);
        }
        newParams.set("page", "1");
        
        navigate(`?${newParams.toString()}`, { replace: true });
        return;
      }

      // Check if page is not a valid number or is something completely else
      if (isNaN(pageNumber) || !Number.isInteger(pageNumber)) {
        showNotification(
          "Invalid page format. Redirecting to last available page.",
          "warning",
          4000
        );
        
        // Redirect to a reasonable last page (500 for popular, or keep current for search)
        const newParams = new URLSearchParams();
        if (query) {
          newParams.set("query", query);
          // For search, we'll let the component handle the max page
          newParams.set("page", "1");
        } else {
          // For popular movies, redirect to page 500 (max available)
          newParams.set("page", "500");
        }
        
        navigate(`?${newParams.toString()}`, { replace: true });
        return;
      }

      // Check if page is too high (beyond reasonable limits)
      if (!query && pageNumber > 500) {
        showNotification(
          "Page number too high. Redirecting to last available page.",
          "warning",
          4000
        );
        
        const newParams = new URLSearchParams();
        newParams.set("page", "500");
        navigate(`?${newParams.toString()}`, { replace: true });
        return;
      }
    }

    // Validate query parameter if present
    if (query !== null) {
      // Check for empty query
      if (query.trim() === "") {
        showNotification(
          "Empty search query. Showing popular movies.",
          "info",
          3000
        );
        
        // Remove query parameter, keep page if valid
        const newParams = new URLSearchParams();
        if (page && !isNaN(parseInt(page, 10)) && parseInt(page, 10) > 0) {
          newParams.set("page", page);
        } else {
          newParams.set("page", "1");
        }
        
        navigate(`?${newParams.toString()}`, { replace: true });
        return;
      }

      // Check for very long queries (potential abuse)
      if (query.length > 100) {
        showNotification(
          "Search query too long. Please use a shorter search term.",
          "warning",
          4000
        );
        
        const newParams = new URLSearchParams();
        newParams.set("page", "1");
        navigate(`?${newParams.toString()}`, { replace: true });
        return;
      }
    }
  }, [searchParams, navigate, showNotification]);

  return {
    isValidUrl: true, // We handle invalid URLs by redirecting
  };
};