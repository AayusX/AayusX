export function Changa({
  className = '',
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <svg
      viewBox="0 0 140 160"
      className={`changa${tone === 'dark' ? ' changa--dark' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="changa__tail changa__tail--left"
        d="M70 104 C83 119 69 128 80 145 C90 156 80 160 74 154 C64 144 78 135 66 120Z"
      />
      <path
        className="changa__tail changa__tail--right"
        d="M62 104 C50 120 62 129 52 143 C45 153 55 159 61 152 C70 142 58 132 70 118Z"
      />
      <path className="changa__wing" d="M70 10 L122 62 L70 112 L18 62Z" />
      <path className="changa__panel" d="M70 18 L112 62 L70 103 L28 62Z" />
      <path className="changa__accent" d="M70 10 L122 62 L70 62Z" />
      <path className="changa__accent changa__accent--small" d="M70 10 L60 4 L64 16Z" />
      <path className="changa__line" d="M70 10 V112 M18 62 H122" />
      <circle className="changa__eye" cx="58" cy="50" r="4.2" />
      <circle className="changa__eye" cx="82" cy="50" r="4.2" />
      <circle className="changa__glint" cx="59.2" cy="48.8" r="1.2" />
      <circle className="changa__glint" cx="83.2" cy="48.8" r="1.2" />
      <path className="changa__line changa__smile" d="M60 66 C66 72 74 72 80 66" />
    </svg>
  );
}
