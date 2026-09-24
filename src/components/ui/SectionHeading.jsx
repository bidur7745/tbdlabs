export function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  const styles = {
    textAlign: align,
    ...(align === 'center' && { maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }),
  };

  return (
    <div className={`section-heading ${className}`.trim()} style={styles}>
      {eyebrow && (
        <span className="section-eyebrow">{eyebrow}</span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </div>
  );
}
