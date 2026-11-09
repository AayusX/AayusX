import type { SimpleIcon } from 'simple-icons';
import {
  siC,
  siCplusplus,
  siDocker,
  siGit,
  siJavascript,
  siLinux,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siQt,
  siReact,
  siSqlite,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVite,
  siWebgl,
} from 'simple-icons';

/**
 * Authentic brand marks from Simple Icons. A tool only appears here if it is
 * used in documented work on this site.
 */
export const TECH_ICONS: Record<string, SimpleIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  'Next.js': siNextdotjs,
  'Node.js': siNodedotjs,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  'Tailwind CSS': siTailwindcss,
  Python: siPython,
  C: siC,
  'C++': siCplusplus,
  Java: siOpenjdk,
  Qt: siQt,
  Git: siGit,
  Linux: siLinux,
  Docker: siDocker,
  JavaScript: siJavascript,
  nginx: siNginx,
  'Three.js': siThreedotjs,
  WebGL: siWebgl,
  Vite: siVite,
};

/** Order used on the Capabilities tech wall. */
export const TECH_WALL = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'SQLite',
  'Tailwind CSS',
  'Python',
  'C',
  'C++',
  'Java',
  'Qt',
  'Git',
  'Linux',
  'Docker',
  'JavaScript',
  'nginx',
  'Three.js',
  'WebGL',
  'Vite',
] as const;

export function techIcon(name: string): SimpleIcon | undefined {
  return TECH_ICONS[name];
}
