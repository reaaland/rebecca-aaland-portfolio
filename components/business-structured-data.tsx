import { SITE_URL } from "@/lib/site-metadata";

const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Aaland Web Design & Site Care",
      legalName: "PawCircle LLC",
      url: SITE_URL,
      founder: {
        "@id": `${SITE_URL}/#rebecca-aaland`,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Rochester",
        },
        {
          "@type": "State",
          name: "Minnesota",
        },
        {
          "@type": "Country",
          name: "United States",
        },
      ],
      description:
        "Web design, site care, technical writing, grant research, and practical business support for small businesses and organizations in Rochester, Minnesota and beyond.",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#rebecca-aaland`,
      name: "Rebecca Aaland",
      url: `${SITE_URL}/about`,
      jobTitle: "Web Designer, Developer, and Technical Writer",
      worksFor: {
        "@id": `${SITE_URL}/#business`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Aaland Web Design & Site Care",
      publisher: {
        "@id": `${SITE_URL}/#business`,
      },
      inLanguage: "en-US",
    },
  ],
} as const;

export function BusinessStructuredData() {
  return (
    <script
      id="business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
