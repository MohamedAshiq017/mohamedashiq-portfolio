export default function SectionHeading({ children, prompt = '$' }) {
  return (
    <h2 className="section-head">
      <span className="section-glyph mono" aria-hidden="true">{prompt}</span>
      <span className="section-title">{children}</span>
    </h2>
  )
}
