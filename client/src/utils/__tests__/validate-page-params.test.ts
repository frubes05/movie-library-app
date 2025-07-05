import { describe, it, expect } from "vitest";
import { validatePageParams } from "../validate-page-params";

describe("validatePageParam", () => {
  it("should return 1 if page param is missing", () => {
    const params = new URLSearchParams();
    expect(validatePageParams(params, 100)).toBe(1);
  });

  it("should return 1 if page param is not a number", () => {
    const params = new URLSearchParams({ page: "abc" });
    expect(validatePageParams(params, 100)).toBe(1);
  });

  it("should return 1 if page param is less than 1", () => {
    const params = new URLSearchParams({ page: "0" });
    expect(validatePageParams(params, 100)).toBe(1);
  });

  it("should return the raw page if within bounds", () => {
    const params = new URLSearchParams({ page: "5" });
    expect(validatePageParams(params, 10)).toBe(5);
  });

  it("should return maxPage if page exceeds it", () => {
    const params = new URLSearchParams({ page: "999" });
    expect(validatePageParams(params, 20)).toBe(20);
  });

  it("should default to 500 if no maxPage is passed", () => {
    const params = new URLSearchParams({ page: "1000" });
    expect(validatePageParams(params)).toBe(500);
  });
});
