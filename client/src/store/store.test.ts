import { describe, it, expect } from "vitest";
import { store } from "./store";
import { moviesApi } from "./apis";

describe("Redux Store", () => {
  it("should have movies api reducer", () => {
    const state = store.getState();
    expect(state).toHaveProperty(moviesApi.reducerPath);
  });

  it("should be able to dispatch actions", () => {
    expect(typeof store.dispatch).toBe("function");
  });

  it("should have proper store structure", () => {
    const state = store.getState();
    expect(typeof state).toBe("object");
  });
});
