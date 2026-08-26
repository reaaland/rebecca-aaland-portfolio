import { SITE_URL } from "@/lib/site-metadata";

const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  url: `${SITE_URL}/`,
  name: "Rebecca Aaland — Frontend Developer and Web Designer",
  description:
    "The portfolio of Rebecca Aaland, a frontend developer and web designer in Rochester, Minnesota.",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#rebecca-aaland`,
    name: "Rebecca Aaland",
    url: `${SITE_URL}/`,
    jobTitle: "Frontend Developer and Web Designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rochester",
      addressRegion: "Minnesota",
      addressCountry: "US",
    },
    sameAs: [
      "https://github.com/reaaland",
      "https://www.linkedin.com/in/rebecca-aaland-494169411",
    ],
    knowsAbout: [
      "Frontend development",
      "Web design",
      "Responsive web design",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Supabase",
      "Firebase",
      "REST APIs",
    ],
  },
} as const;

export function ProfileStructuredData() {
  return (
    <script
      id="profile-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profileStructuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
