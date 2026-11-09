export type ProjectStatus = 'production' | 'shipped' | 'iterating' | 'archived' | 'classified';

export type CoverTone = 'botanical' | 'clay' | 'ink' | 'lavender';

export type CaseStudySlug =
  | 'mother-school'
  | 'loan-management'
  | 'failfirst-engine'
  | 'gesture-solar'
  | 'aayushai-core';

export interface CaseStudy {
  slug: CaseStudySlug;
  year: string;
  status: ProjectStatus;
  tone: CoverTone;
  tech: string[];
  featured: boolean;
  live?: string;
  code?: string;
  media?: {
    src: string;
    type: 'video';
  };
}

/**
 * Only facts present in the audited repository are represented here.
 * Copy for each case study lives in `src/i18n/{en,ne}.ts` under
 * `projects.items`; the slug is the shared key.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'mother-school',
    year: '2024',
    status: 'production',
    tone: 'botanical',
    tech: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'nginx'],
    featured: true,
    live: 'https://aama-scl.netlify.app',
    media: { src: '/media/mother-school-demo.mp4', type: 'video' },
  },
  {
    slug: 'loan-management',
    year: '2023',
    status: 'production',
    tone: 'ink',
    tech: ['Python', 'SQLite', 'Tkinter', 'PyInstaller', 'openpyxl'],
    featured: true,
    code: 'https://github.com/AayusX/loan-management-system',
  },
  {
    slug: 'failfirst-engine',
    year: '2025',
    status: 'shipped',
    tone: 'clay',
    tech: ['C++', 'Qt', 'MinGW', 'CMake', 'Custom parser'],
    featured: true,
    code: 'https://github.com/AayusX/Fail-First---Best-Code-learning-platform-in-gaming-way',
  },
  {
    slug: 'gesture-solar',
    year: 'Ongoing',
    status: 'iterating',
    tone: 'lavender',
    tech: ['JavaScript', 'WebGL', 'Three.js', 'Computer vision'],
    featured: true,
    live: 'https://aayusxat7.github.io/Gesture-Solar',
    media: { src: '/media/gesture-solar-demo.mp4', type: 'video' },
  },
  {
    slug: 'aayushai-core',
    year: 'Ongoing',
    status: 'iterating',
    tone: 'ink',
    tech: ['Python', 'LLM agents', 'RAG', 'Local-first'],
    featured: false,
    code: 'https://github.com/AayusX/AayushAI-Core',
  },
];

export const FEATURED_CASE_STUDIES = CASE_STUDIES.filter((project) => project.featured);

export interface ArchiveProject {
  title: string;
  status: ProjectStatus;
  tech: string[];
  href: string;
}

/**
 * Earlier, smaller, or no-longer-maintained work. Titles are proper names and
 * are intentionally not translated. Descriptions are omitted rather than
 * inventing copy that does not exist in both languages.
 */
export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: 'Apex Trader',
    status: 'shipped',
    tech: ['Web', 'Android', 'Desktop'],
    href: 'https://github.com/AayusX/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
  },
  {
    title: 'Aayush Bot V1',
    status: 'archived',
    tech: ['TypeScript', 'NLP'],
    href: 'https://github.com/Aayushkin/aayush-bot-v1',
  },
  {
    title: 'Best Web Calculator',
    status: 'shipped',
    tech: ['JavaScript', 'Accessibility'],
    href: 'https://github.com/Aayushkin/Best-Web-Calculator',
  },
  {
    title: 'C++ AI Experiments',
    status: 'archived',
    tech: ['C++', 'Algorithms'],
    href: 'https://github.com/Aayushkin/CPP_Ai',
  },
  {
    title: 'JS Game Collection',
    status: 'shipped',
    tech: ['JavaScript', 'Canvas'],
    href: 'https://aayushkin.github.io/game',
  },
  {
    title: 'Python–C++ Chatbot',
    status: 'archived',
    tech: ['Python', 'C++'],
    href: 'https://github.com/Aayushkin/Python-cpp_Chatbot',
  },
  {
    title: 'Face Detector',
    status: 'shipped',
    tech: ['Computer vision', 'Machine learning'],
    href: 'https://aayusx.github.io/Face-Detector',
  },
  {
    title: 'Pentesting Tool',
    status: 'classified',
    tech: ['Security', 'Python'],
    href: 'https://github.com/aayusxat7/pentesting-tool',
  },
  {
    title: 'Minecraft Mod',
    status: 'shipped',
    tech: ['Java', 'Game modding'],
    href: 'https://github.com/AayusX/Minecraft-mod',
  },
  {
    title: 'ChillAura',
    status: 'shipped',
    tech: ['UX', 'Wellness'],
    href: 'https://github.com/Aayushkin/ChillAura',
  },
  {
    title: 'Media Player C',
    status: 'archived',
    tech: ['C', 'Systems'],
    href: 'https://github.com/Aayushkin/Media-Player-C-',
  },
  {
    title: 'Space Adventure',
    status: 'shipped',
    tech: ['Physics', 'Games'],
    href: 'https://github.com/Aayushkin/SpaceHack',
  },
  {
    title: 'PDF Viewer',
    status: 'shipped',
    tech: ['PDF.js', 'JavaScript'],
    href: 'https://aayushkin.github.io/The-Pdf-viewer',
  },
  {
    title: 'Smart Mavi',
    status: 'archived',
    tech: ['C++', 'Automation'],
    href: 'https://github.com/AayusX/Smart_Mavi',
  },
];

export const PROJECT_STATUSES: ProjectStatus[] = [
  'production',
  'shipped',
  'iterating',
  'archived',
  'classified',
];

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return CASE_STUDIES.find((project) => project.slug === slug);
}

export function getAdjacentCaseStudies(slug: CaseStudySlug): {
  previous: CaseStudy;
  next: CaseStudy;
} {
  const index = CASE_STUDIES.findIndex((project) => project.slug === slug);
  return {
    previous: CASE_STUDIES[(index - 1 + CASE_STUDIES.length) % CASE_STUDIES.length],
    next: CASE_STUDIES[(index + 1) % CASE_STUDIES.length],
  };
}
