export function MinnlawnProjectVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "minnlawn-project-visual minnlawn-project-visual-compact"
          : "minnlawn-project-visual"
      }
      aria-hidden="true"
    >
      <div className="minnlawn-preview-chrome">
        <span />
        <span />
        <span />
        <small>minnlawn.com</small>
      </div>

      <div className="minnlawn-preview-body">
        <div className="minnlawn-preview-brand">
          <span>M</span>
          <div>
            <strong>MINNLAWN</strong>
            <small>LAWN &amp; LANDSCAPE</small>
          </div>
        </div>

        <p>ROCHESTER, MINNESOTA</p>
        <h3>Clear service paths. Seasonal content. Easier quotes.</h3>

        <div className="minnlawn-preview-pills">
          <span>Responsive rebuild</span>
          <span>Seasonal automation</span>
          <span>SEO + performance</span>
        </div>
      </div>
    </div>
  );
}
