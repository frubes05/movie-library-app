import { describe, it, expect } from "vitest";
import { render } from "../../../test/test-utils";
import SearchFormSkeleton from "./search-skeleton";

describe("SearchFormSkeleton", () => {
  it("should render skeleton elements", () => {
    const { container } = render(<SearchFormSkeleton />);

    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should have form structure", () => {
    const { container } = render(<SearchFormSkeleton />);

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("should have stack layout", () => {
    const { container } = render(<SearchFormSkeleton />);

    const stack = container.querySelector(".MuiStack-root");
    expect(stack).toBeInTheDocument();
  });
});
