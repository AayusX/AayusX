import type { SVGProps } from 'react';
import type { SimpleIcon } from 'simple-icons';

type IconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </StrokeIcon>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </StrokeIcon>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </StrokeIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </StrokeIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </StrokeIcon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </StrokeIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </StrokeIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </StrokeIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="m18.4 5.6-2.8 2.8" />
      <path d="m8.4 15.6-2.8 2.8" />
    </StrokeIcon>
  );
}

export function BrandIcon({
  icon,
  title,
  className,
  decorative = true,
}: {
  icon: SimpleIcon;
  title?: string;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      {!decorative && <title>{title ?? icon.title}</title>}
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}
