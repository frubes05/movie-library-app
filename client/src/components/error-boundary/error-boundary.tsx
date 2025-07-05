import React, { Component, ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Optional: Send to error monitoring service
    // this.sendErrorToMonitoring(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          p={4}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              maxWidth: 500,
              border: "2px solid #f44336",
              borderRadius: 2,
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 64,
                color: "#f44336",
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              We encountered an unexpected error. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={this.handleReload}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
              }}
            >
              Refresh Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;