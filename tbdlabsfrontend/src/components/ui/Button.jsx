

export function Button({
  children,
  variant = 'primary',
  // eslint-disable-next-line no-unused-vars
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseClass = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={baseClass} onClick={onClick} {...props}>
        {Icon && iconPosition === 'left' && <Icon size={16} aria-hidden="true" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon size={16} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={16} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={16} aria-hidden="true" />}
    </button>
  );
}
