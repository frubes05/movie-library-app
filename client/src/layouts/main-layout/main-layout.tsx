import { Container, Box, Typography, Paper } from "@mui/material";
import type { ReactNode } from "react";

type MainLayoutProps = {
  title?: string;
  filterSection?: ReactNode;
  content: ReactNode;
};

const MainLayout = ({ title, filterSection, content }: MainLayoutProps) => {
  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
      {title && (
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {title}
        </Typography>
      )}

      {filterSection && (
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          {filterSection}
        </Paper>
      )}

      <Box>{content}</Box>
    </Container>
  );
};

export default MainLayout;
