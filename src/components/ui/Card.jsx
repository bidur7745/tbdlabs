export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`card ${hover ? '' : 'card-no-hover'} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
