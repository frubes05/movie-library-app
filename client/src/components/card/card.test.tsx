import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/test-utils";
import CardComponent from "./card";

describe("CardComponent", () => {
  const mockHeaderContent = (
    <div data-testid="header-content">Header Content</div>
  );
  const mockBodyContent = <div data-testid="body-content">Body Content</div>;

  it("should render header and body content", () => {
    render(
      <CardComponent
        cardHeaderContent={mockHeaderContent}
        cardBodyContent={mockBodyContent}
      />
    );

    expect(screen.getByTestId("header-content")).toBeInTheDocument();
    expect(screen.getByTestId("body-content")).toBeInTheDocument();
  });

  it("should have proper card structure", () => {
    const { container } = render(
      <CardComponent
        cardHeaderContent={mockHeaderContent}
        cardBodyContent={mockBodyContent}
      />
    );

    const card = container.querySelector(".MuiCard-root");
    expect(card).toBeInTheDocument();

    const cardActionArea = container.querySelector(".MuiCardActionArea-root");
    expect(cardActionArea).toBeInTheDocument();
  });

  it("should render with correct styling classes", () => {
    const { container } = render(
      <CardComponent
        cardHeaderContent={mockHeaderContent}
        cardBodyContent={mockBodyContent}
      />
    );

    const card = container.querySelector(".MuiCard-root");
    expect(card).toHaveStyle({
      "background-color": "white",
      "border-radius": "8px",
    });
  });
});
