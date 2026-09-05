export function MinnlawnProjectVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "minnlawn-project-visual minnlawn-project-visual-compact"
          : "minnlawn-project-visual"
      }
    >
      <img
        src="/minnlawn-portfolio-real.svg"
        alt="Minnlawn Lawn & Landscape homepage showing the lawn care hero, seasonal service messaging, and service cards"
        loading="lazy"
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  );
}
