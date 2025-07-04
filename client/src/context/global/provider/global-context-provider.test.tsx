import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "../provider/global-context-provider";
import { useGlobalContext } from "../../../hooks/global";

vi.mock("../../../hooks/mobile-breakpoint", () => ({
  useMobileBreakpoint: () => false,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <GlobalContextProvider>{children}</GlobalContextProvider>
  </BrowserRouter>
);

describe("GlobalContextProvider", () => {
  it("should provide initial context values", () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    expect(result.current.searchQuery).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.isMobile).toBe(false);
    expect(typeof result.current.onPageChange).toBe("function");
    expect(typeof result.current.onInputChange).toBe("function");
    expect(typeof result.current.onSubmitSearch).toBe("function");
  });

  it("should update page when onPageChange is called", () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    act(() => {
      result.current.onPageChange(3);
    });

    expect(result.current.page).toBe(3);
  });

  it("should update search query when onSubmitSearch is called", () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    act(() => {
      result.current.onSubmitSearch("test movie");
    });

    expect(result.current.searchQuery).toBe("test movie");
    expect(result.current.page).toBe(1);
  });

  it("should trim whitespace in search query", () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    act(() => {
      result.current.onSubmitSearch("  test movie  ");
    });

    expect(result.current.searchQuery).toBe("test movie");
  });

  it("should handle empty search query", () => {
    const { result } = renderHook(() => useGlobalContext(), { wrapper });

    act(() => {
      result.current.onSubmitSearch("");
    });

    expect(result.current.searchQuery).toBe("");
  });
});
