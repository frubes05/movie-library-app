import { Card, CardActionArea, CardContent } from "@mui/material";
import type { ReactNode } from "react";

interface ICardComponent {
  cardHeaderContent: ReactNode;
  cardBodyContent: ReactNode;
}

const CardComponent = ({
  cardHeaderContent,
  cardBodyContent,
}: ICardComponent) => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        color: "black",
        border: "2px solid black",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
        "&:focus, & > button:focus": {
          outline: "none",
        },
        "&:focus-visible, & > button:focus-visible": {
          outline: "none",
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {cardHeaderContent}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {cardBodyContent}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
