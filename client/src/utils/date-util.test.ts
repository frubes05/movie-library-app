import { describe, it, expect } from "vitest";
import { formatDateWithSuffix } from "./date-util";

describe("formatDateWithSuffix", () => {
  it("should format a valid date string correctly", () => {
    const result = formatDateWithSuffix("2023-12-25");
    expect(result).toBe("25th of December");
  });

  it("should format a date with 1st suffix correctly", () => {
    const result = formatDateWithSuffix("2023-01-01");
    expect(result).toBe("1st of January");
  });

  it("should format a date with 2nd suffix correctly", () => {
    const result = formatDateWithSuffix("2023-02-02");
    expect(result).toBe("2nd of February");
  });

  it("should format a date with 3rd suffix correctly", () => {
    const result = formatDateWithSuffix("2023-03-03");
    expect(result).toBe("3rd of March");
  });

  it("should format a date with 21st suffix correctly", () => {
    const result = formatDateWithSuffix("2023-04-21");
    expect(result).toBe("21st of April");
  });

  it("should format a date with 22nd suffix correctly", () => {
    const result = formatDateWithSuffix("2023-05-22");
    expect(result).toBe("22nd of May");
  });

  it("should format a date with 23rd suffix correctly", () => {
    const result = formatDateWithSuffix("2023-06-23");
    expect(result).toBe("23rd of June");
  });

  it("should handle Date object input", () => {
    const date = new Date("2023-07-15");
    const result = formatDateWithSuffix(date);
    expect(result).toBe("15th of July");
  });

  it('should return "Unknown release date" for invalid date string', () => {
    const result = formatDateWithSuffix("invalid-date");
    expect(result).toBe("Unknown release date");
  });

  it('should return "Unknown release date" for empty string', () => {
    const result = formatDateWithSuffix("");
    expect(result).toBe("Unknown release date");
  });

  it("should handle edge cases for ordinal suffixes", () => {
    expect(formatDateWithSuffix("2023-08-11")).toBe("11th of August");
    expect(formatDateWithSuffix("2023-09-12")).toBe("12th of September");
    expect(formatDateWithSuffix("2023-10-13")).toBe("13th of October");
  });
});
