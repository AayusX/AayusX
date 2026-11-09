import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FEATURED_CASE_STUDIES } from '../content/projects';
import { SITE, mailtoHref } from '../content/site';
import { TECH_WALL } from '../content/tech';

interface Line {
  cls?: string;
  prefix?: string;
  node: ReactNode;
}

const QUICK_COMMANDS = ['whoami', 'projects', 'stack', 'contact', 'uptime', 'clear'] as const;

const sessionStart = Date.now();

export default function Terminal() {
  const { t } = useTranslation();
  const banner = useMemo<Line[]>(
    () => [
      { cls: 'sys', node: t('experiments.terminalBanner') },
      { cls: 'sys', node: t('experiments.terminalHint') },
    ],
    [t],
  );
  const [lines, setLines] = useState<Line[]>(banner);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(banner);
  }, [banner]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  const respond = (raw: string): Line[] => {
    const command = raw.trim().toLowerCase();

    switch (command) {
      case 'help':
        return [
          { cls: 'sys', node: t('terminal.helpTitle') },
          ...(t('terminal.help', { returnObjects: true }) as string[]).map((line) => ({
            cls: 'o',
            node: line,
          })),
        ];
      case 'whoami':
        return [{ cls: 'ok', node: t('terminal.whoami') }];
      case 'projects':
        return [
          { cls: 'sys', node: t('terminal.projectsTitle') },
          ...FEATURED_CASE_STUDIES.map((project, index) => ({
            node: (
              <>
                <span className="sys">{String(index + 1).padStart(2, '0')}.</span>{' '}
                <a
                  href={project.live ?? project.code ?? SITE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`projects.items.${project.slug}.title`)}
                </a>{' '}
                <span className="sys">[{project.tech.slice(0, 3).join(', ')}]</span>
              </>
            ),
          })),
        ];
      case 'stack':
        return [
          { cls: 'sys', node: t('terminal.stackTitle') },
          { cls: 'o', node: TECH_WALL.join(' · ') },
        ];
      case 'contact':
        return [
          { cls: 'sys', node: t('terminal.contactTitle') },
          { node: t('terminal.contactBody', { email: SITE.email }) },
          {
            node: (
              <a href={mailtoHref()}>
                {SITE.email}
              </a>
            ),
          },
        ];
      case 'uptime': {
        const seconds = Math.max(1, Math.round((Date.now() - sessionStart) / 1000));
        return [{ cls: 'o', node: t('terminal.uptimeLabel', { seconds }) }];
      }
      default:
        return [{ cls: 'err', node: t('terminal.notFound', { command }) }];
    }
  };

  const submit = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    setHistory((current) => [...current, raw].slice(-50));
    setHistoryIndex(-1);
    setValue('');

    if (command === 'clear') {
      setLines([]);
      return;
    }

    setLines((current) => [
      ...current,
      { cls: 'cmd', prefix: t('terminal.prompt'), node: raw },
      ...respond(raw),
    ]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (history.length === 0) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue('');
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className="term-window">
      <div className="term-bar">
        <div className="term-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="term-title">{t('experiments.terminalTitle')}</div>
      </div>

      <div className="term-out" ref={outputRef} aria-live="polite">
        {lines.map((line, index) => (
          <div className="tl" key={`${index}-${String(line.node).slice(0, 12)}`}>
            {line.prefix ? <span className="p">{line.prefix}</span> : null}
            <span className={line.cls ?? ''}>{line.node}</span>
          </div>
        ))}
      </div>

      <div className="term-palette" role="group" aria-label={t('experiments.terminalQuick')}>
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            className="mono term-chip"
            onClick={() => submit(command)}
          >
            {command}
          </button>
        ))}
      </div>

      <form
        className="term-in"
        onSubmit={(event) => {
          event.preventDefault();
          submit(value);
        }}
      >
        <span className="p">{t('terminal.prompt')}</span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('terminal.helpTitle')}
          aria-label={t('experiments.terminalInput')}
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
