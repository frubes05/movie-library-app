import { describe, it, expect } from "vitest";
import { render } from "../../../test/test-utils";
import CardSkeletonComponent from "./card-skeleton";

describe("CardSkeletonComponent", () => {
  it("should render skeleton elements", () => {
    const { container } = render(<CardSkeletonComponent />);

    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should have card structure", () => {
    const { container } = render(<CardSkeletonComponent />);

    const card = container.querySelector(".MuiCard-root");
    expect(card).toBeInTheDocument();
  });

  it("should have proper skeleton layout", () => {
    const { container } = render(<CardSkeletonComponent />);

    const cardContent = container.querySelector(".MuiCardContent-root");
    expect(cardContent).toBeInTheDocument();
  });
});
