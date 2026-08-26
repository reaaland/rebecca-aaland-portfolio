import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected web and frontend projects from Rebecca Aaland, including PawCircle Membership, Skinstric, Ultraverse NFT Marketplace, and Summarist.",
};

const projects = [
  {
    number: "01",
    label: "Independent product",
    title: "PawCircle Membership",
    summary:
      "Taking a pet-care membership product from idea through development, launch, production troubleshooting, and its current portfolio-demo form.",
    href: "/work/pawcircle",
    image: "/pawcircle-homepage.png",
    imageAlt: "PawCircle Membership homepage",
    imageWidth: 1536,
    imageHeight: 1024,
    className: "work-index-pawcircle",
  },
  {
    number: "02",
    label: "Skinstric internship",
    title: "Skinstric",
    summary:
      "Implementing a responsive Next.js and TypeScript skin-analysis flow from supplied Figma designs, APIs, assets, and project requirements, including image upload, camera capture, and interactive demographic results.",
    href: "/work/skinstric",
    image: "/skinstric-homepage.png",
    imageAlt: "Skinstric skin-analysis application homepage",
    imageWidth: 1672,
    imageHeight: 941,
    className: "work-index-skinstric",
  },
  {
    number: "03",
    label: "Frontend development project",
    title: "Ultraverse NFT Marketplace",
    summary:
      "Building a responsive React marketplace with API-driven content, loading states, carousels, timers, filtering, incremental loading, and routed detail views.",
    href: "/work/ultraverse",
    image: "/ultraverse-homepage.png",
    imageAlt: "Ultraverse NFT marketplace homepage",
    imageWidth: 1672,
    imageHeight: 941,
    className: "work-index-ultraverse",
  },
  {
    number: "04",
    label: "Completed Frontend Simplified coursework",
    title: "Summarist",
    summary:
      "A completed multi-route Next.js book-summary application built from supplied requirements, APIs, assets, and a visual starting point. It includes authentication, search, Firestore persistence, subscription-aware access, library behavior, settings, and an audio player.",
    href: "/work/summarist",
    image: "/summarist-case-study.png",
    imageAlt: "Summarist personalized For You page",
    imageWidth: 1672,
    imageHeight: 941,
    className: "work-index-summarist",
  },
] as const;

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Selected work</p>
          <h1>Different projects. Different problems to solve.</h1>
          <p>
            These projects show different kinds of frontend work: taking a
            product from idea to launch, implementing supplied requirements, and
            building responsive API-driven interfaces.
          </p>
        </section>

        <section className="work-index shell" aria-label="Case studies">
          {projects.map((project) => (
            <Link
              className={`work-index-card ${project.className}`}
              href={project.href}
              key={project.title}
              data-reveal
            >
              <div className="work-index-image">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  sizes="(max-width: 980px) calc(100vw - 48px), 600px"
                />
              </div>

              <div className="work-index-content">
                <span>
                  {project.number} / {project.label}
                </span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <strong className="work-index-link">
                  Read the case study ↗
                </strong>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
