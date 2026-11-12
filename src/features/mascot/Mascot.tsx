/**
 * The illustrated AayusX companion.
 *
 * A transparent portrait used in the cursor, hero, and footer. The kite
 * (Changa) still opens the site in the intro.
 */
export function Mascot({ className = '' }: { className?: string }) {
  return (
    <img
      className={`mascot${className ? ` ${className}` : ''}`}
      src="/mascot.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      width={320}
      height={480}
    />
  );
}
