import React, { Component, ReactNode } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
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
    
    this.setState({
      error,
      errorInfo
    });

    // Optional: Send to error monitoring service
    this.sendErrorToMonitoring(error, errorInfo);
  }

  sendErrorToMonitoring = (error: Error, errorInfo: React.ErrorInfo) => {
    // In a real app, you would send this to a service like Sentry, LogRocket, etc.
    console.log("Sending error to monitoring service:", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
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
          minHeight="100vh"
          p={4}
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 6,
              textAlign: "center",
              maxWidth: 600,
              border: "2px solid #f44336",
              borderRadius: 3,
              background: "white",
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 80,
                color: "#f44336",
                mb: 3,
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
              }}
            />
            
            <Typography variant="h4" gutterBottom fontWeight={700} color="error">
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="h6" color="text.secondary" mb={2}>
              We encountered an unexpected error
            </Typography>
            
            <Typography variant="body1" color="text.secondary" mb={4}>
              Don't worry, this happens sometimes. You can try refreshing the page 
              or go back to the home page. If the problem persists, please contact support.
            </Typography>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                sx={{
                  mb: 4,
                  p: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                  textAlign: "left",
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                <Typography variant="caption" color="error" fontWeight={600}>
                  Error Details (Development Mode):
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontSize: "0.75rem" }}>
                  {this.state.error.message}
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Refresh Page
              </Button>
              
              <Button
                variant="outlined"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Go Home
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" mt={3} display="block">
              Error ID: {Date.now().toString(36)}
            </Typography>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;