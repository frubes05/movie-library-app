import React from "react";
import { Helmet } from "react-helmet-async";
import { useHeadSEO } from "../../hooks/head-seo";
import { useLocation } from "react-router-dom";

interface IHeadSEO {
  searchQuery: string;
  page: number;
}

const HeadSEO: React.FC<IHeadSEO> = ({ searchQuery, page }) => {
  const location = useLocation();
  const { title, description, url } = useHeadSEO(searchQuery, page);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_LOCAL_PROD_URL
      : import.meta.env.VITE_LOCAL_BASE_URL;
  const fullUrl = url?.startsWith("http") ? url : `${baseUrl}${url}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Movies Library",
    description:
      "A comprehensive movie library application for discovering and searching movies",
    url: baseUrl,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Organization",
      name: "Movie Library App",
    },
    featureList: [
      "Movie search by title",
      "Popular movies listing",
      "Genre filtering",
      "Movie ratings and reviews",
      "Responsive design",
      "Mobile optimized",
    ],
  };

  return (
    <Helmet key={location.pathname + location.search + page}>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <link rel="canonical" href={fullUrl} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default HeadSEO;
