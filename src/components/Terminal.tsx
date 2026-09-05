import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { allProjects, stackItems } from '../projectsData';

interface Line {
  cls?: string;
  prefix?: string;
  node: ReactNode;
}

const BANNER: Line[] = [
  { cls: 'sys', node: 'aayusx-shell v7.2 — interactive evidence terminal' },
  { cls: 'sys', node: "type 'help' to list commands. no sudo required (mostly)." },
];

let bootTime = Date.now();

function buildResponse(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];

  switch (cmd) {
    case 'help':
      return [
        { node: 'available commands:' },
        { cls: 'o', node: '  whoami          — who is this guy' },
        { cls: 'o', node: '  projects        — list all 19 experiments' },
        { cls: 'o', node: '  stack           — technologies in rotation' },
        { cls: 'o', node: '  contact         — open a channel' },
        { cls: 'o', node: '  uptime          — how long you have been here' },
        { cls: 'o', node: '  hire            — the fast path' },
        { cls: 'o', node: '  clear           — wipe the evidence' },
      ];
     case 'whoami':
      return [
        { cls: 'ok', node: "Aayush Bhandari (AayusX) — builder. 19 shipped projects. President, ICT Club. Co-founder, Yugya. Kathmandu, Nepal." },
      ];
    case 'projects':
      return [
        { cls: 'sys', node: 'PRODUCTION (2)' },
        ...allProjects.filter(p => p.status === 'production').map((p, i) => ({
          node: (
            <>
              <span className="sys">{String(i + 1).padStart(2, '0')}.</span>{' '}
              <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a>{' '}
              <span className="sys">[{p.tags.join(', ')}]</span>
            </>
          ),
        })),
        { cls: 'sys', node: 'SHIPPED (9)' },
        ...allProjects.filter(p => p.status === 'shipped').map((p, i) => ({
          node: (
            <>
              <span className="sys">{String(i + 1).padStart(2, '0')}.</span>{' '}
              <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a>{' '}
              <span className="sys">[{p.tags.join(', ')}]</span>
            </>
          ),
        })),
        { cls: 'sys', node: 'ALIVE (1) · ITERATING (1) · ARCHIVED (6) · CLASSIFIED (1)' },
      ];
    case 'sudo rm -rf /':
      return [{ cls: 'err', node: 'Nice try. The cubes are watching.' }];
    case 'ls':
      return [{ cls: 'o', node: 'No files here. Try \'projects\'.' }];
    case 'pwd':
      return [{ cls: 'ok', node: '/home/visitor/aayusx.dev' }];
    case 'date': {
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      return [{ cls: 'o', node: `KTM · ${fmt.format(new Date())}` }];
    }
    case 'hire':
    case 'sudo hire-aayush':
      return [
        { cls: 'ok', node: 'ACCESS GRANTED.' },
        { node: <>opening secure channel → <a href="mailto:technology457t@gmail.com?subject=Let%27s%20build%20something">technology457t@gmail.com</a></> },
        { cls: 'o', node: 'available for internships & co-founder roles. email is the fastest way.' },
      ];
    case 'clear':
      return [];
    default:
      return [{ cls: 'err', node: `command not found: ${cmd} — try 'help'` }];
  }
}

const PALETTE_CMDS = ['whoami', 'projects', 'stack', 'contact', 'hire', 'clear'];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [...h, raw].slice(-50));
    setHistIdx(-1);
    if (cmd === 'clear') {
      setLines([]);
      setValue('');
      return;
    }
    setLines((l) => [...l, { cls: 'cmd', prefix: 'visitor@aayusx.dev:~$', node: raw }, ...buildResponse(raw)]);
    setValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setValue('');
      } else {
        setHistIdx(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className="term-window" data-cursor="TYPE">
      <div className="term-bar">
        <div className="term-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="term-title">visitor@aayusx.dev — zsh</div>
      </div>
      <div className="term-out" ref={outRef} aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`tl`}>
            {l.prefix && <span className="p">{l.prefix}</span>}
            <span className={l.cls ?? ''}>{l.node}</span>
          </div>
        ))}
      </div>
      <div className="term-palette" aria-label="Quick commands">
        {PALETTE_CMDS.map((c) => (
          <button
            key={c}
            type="button"
            className="mono term-chip"
            onClick={() => run(c)}
            aria-label={`Run ${c}`}
          >
            {c}
          </button>
        ))}
      </div>
      <form
        className="term-in"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
      >
        <span className="p">visitor@aayusx.dev:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type 'help'"
          aria-label="terminal input"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}