import { Card, CardContent } from "@mui/material";
import type { PropsWithChildren } from "react";

const CardComponent = ({ children }: PropsWithChildren) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
