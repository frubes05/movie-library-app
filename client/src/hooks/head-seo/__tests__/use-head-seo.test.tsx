import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHeadSEO } from "../use-head-seo";

describe("useHeadSEO", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    keywords: "test, react, seo",
    canonicalUrl: "https://example.com/test-page",
  };

  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("sets the document title", () => {
    renderHook(() => useHeadSEO(defaultProps));
    expect(document.title).toBe("Test Title");
  });

  it("creates and sets meta tags correctly", () => {
    renderHook(() => useHeadSEO(defaultProps));

    const titleMeta = document.querySelector('meta[name="title"]');
    const descMeta = document.querySelector('meta[name="description"]');
    const keywordsMeta = document.querySelector('meta[name="keywords"]');

    expect(titleMeta?.getAttribute("content")).toBe("Test Title");
    expect(descMeta?.getAttribute("content")).toBe("Test Description");
    expect(keywordsMeta?.getAttribute("content")).toBe("test, react, seo");
  });

  it("creates a canonical link if missing", () => {
    renderHook(() => useHeadSEO(defaultProps));

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute("href")).toBe(defaultProps.canonicalUrl);
  });

  it("updates existing canonical link", () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", "https://old-link.com");
    document.head.appendChild(link);

    renderHook(() => useHeadSEO(defaultProps));

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe(defaultProps.canonicalUrl);
  });
});
