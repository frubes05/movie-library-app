import { useEffect } from "react";

interface UseSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
}

export function useHeadSEO({
  title,
  description,
  keywords,
  canonicalUrl,
}: UseSEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`
      );
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta("title", title);
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    let canonicalTag = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonicalTag && canonicalUrl) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      document.head.appendChild(canonicalTag);
    }
    if (canonicalTag && canonicalUrl) {
      canonicalTag.href = canonicalUrl;
    }
  }, [title, description, keywords, canonicalUrl]);
}
