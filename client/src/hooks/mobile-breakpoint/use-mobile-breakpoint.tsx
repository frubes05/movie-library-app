import { useMediaQuery, useTheme } from "@mui/material";

export const useMobileBreakpoint = () => {
  const theme = useTheme();
  const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobileBreakpoint;
};
