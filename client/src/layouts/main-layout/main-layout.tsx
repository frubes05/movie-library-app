import { Container, Box, Typography, Paper } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import type { ReactNode } from "react";
import { useGlobalContext } from "../../hooks/global";

type MainLayoutProps = {
  title?: string;
  searchSection?: ReactNode;
  content: ReactNode;
};

const MainLayout = ({ title, searchSection, content }: MainLayoutProps) => {
  const { isMobile } = useGlobalContext();

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 6 }}>
      {title && (
        <Box
          color="black"
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-end"
          gap="12px"
        >
          <MovieFilterIcon sx={{ fontSize: isMobile ? "48px" : "64px" }} />
          <Typography
            variant="h1"
            fontWeight={700}
            marginBottom={0}
            fontSize={isMobile ? "32px" : "48px"}
            gutterBottom
          >
            {title}
          </Typography>
        </Box>
      )}

      {searchSection && (
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 4,
            background: "transparent",
            boxShadow: "none",
            border: "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          {searchSection}
        </Paper>
      )}

      <Box>{content}</Box>
    </Container>
  );
};

export default MainLayout;
