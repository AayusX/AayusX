export type Status = 'production' | 'shipped' | 'alive' | 'iterating' | 'archived' | 'classified';

export interface Project {
  title: string;
  tags: string[];
  link: string;
  desc: string;
  status: Status;
}

export interface FlagshipProject extends Project {
  whatItDoes: string;
  whyItExists: string;
  myRole: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
}

export interface Featured {
  id: number;
  title: string;
  color: string;
  position: [number, number, number];
  link: string;
}

export interface VentureDetail {
  org: string;
  role: string;
  tag: string;
  link: string;
  cta: string;
  desc: string;
  whatIBuilt: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
}

export const featuredProjects: Featured[] = [
  {
    id: 1,
    title: 'MOTHER SCHOOL',
    color: '#C6FF3D',
    position: [-2.5, 2, 0],
    link: 'https://aama-scl.netlify.app',
  },
  {
    id: 2,
    title: 'LOAN MANAGEMENT',
    color: '#FF5C00',
    position: [0, 3, 0],
    link: 'https://github.com/AayusX/loan-management-system',
  },
  {
    id: 3,
    title: 'FAILFIRST ENGINE',
    color: '#41D1FF',
    position: [2.5, 2.5, 0],
    link: 'https://github.com/AayusX/Fail-First---Best-Code-learning-platform-in-gaming-way',
  },
];

export const STATUS_LABELS: Record<Status, string> = {
  production: 'IN PRODUCTION',
  shipped: 'SHIPPED',
  alive: 'STILL ALIVE',
  iterating: 'ITERATING',
  archived: 'ARCHIVED',
  classified: 'CLASSIFIED',
};

export const allProjects: Project[] = [
  {
    title: 'AayushAI Core',
    tags: ['Python', 'LLM Agents', 'RAG'],
    link: 'https://github.com/AayusX/AayushAI-Core',
    desc: "Personal assistant core — voice, long-term memory, a daily journal, reminders and task automation in one Python app. Where I learned RAG and agent tool-calling; it gets rebuilt as I learn.",
    status: 'iterating',
  },
  {
    title: 'FailFirst Engine',
    tags: ['C++', 'Education'],
    link: 'https://github.com/AayusX/Fail-First---Best-Code-learning-platform-in-gaming-way',
    desc: "Gamified bug-fixing app that teaches C, C++ and Java by making you debug real code. 60+ challenges with XP, streaks and achievements, packed into a single portable .exe with a bundled compiler. My 2025 school project — the tool I wished existed when I was learning.",
    status: 'shipped',
  },
  {
    title: 'Apex Trader',
    tags: ['Trading', 'Web', 'Android', 'Desktop'],
    link: 'https://github.com/AayusX/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
    desc: "Cross-platform trading demo — web, Android and desktop — for charting, market analysis and paper trades. Built so I could learn patterns without risking real money.",
    status: 'shipped',
  },
  {
    title: 'Gesture Solar',
    tags: ['Computer Vision', 'WebGL'],
    link: 'https://aayusxat7.github.io/Gesture-Solar',
    desc: "Webcam gestures drive a 3D solar system — all 8 planets with moons, a 1,500-asteroid belt and 3,000 stars. Runs entirely in the browser; nothing to install.",
    status: 'alive',
  },
  {
    title: 'Aayush Bot V1',
    tags: ['TypeScript', 'NLP'],
    link: 'https://github.com/Aayushkin/aayush-bot-v1',
    desc: "My first chatbot experiments in TypeScript — hand-rolled NLP before I'd touched an LLM API. Archived now, but it's where the AI work started.",
    status: 'archived',
  },
  {
    title: 'Best Web Calculator',
    tags: ['JavaScript', 'UI'],
    link: 'https://github.com/Aayushkin/Best-Web-Calculator',
    desc: "Keyboard-first calculator, zero dependencies, no framework. The math was easy — focus order, touch targets, and mobile layout were the real work.",
    status: 'shipped',
  },
  {
    title: 'C++ AI Experiments',
    tags: ['C++', 'Algorithms'],
    link: 'https://github.com/Aayushkin/CPP_Ai',
    desc: "Hand-rolled AI algorithms in native C++ — no libraries, just math and stubbornness.",
    status: 'archived',
  },
  {
    title: 'JS Game Collection',
    tags: ['JavaScript', 'Canvas', 'Games'],
    link: 'https://aayushkin.github.io/game',
    desc: "Browser games on raw canvas — hand-written physics loops before I knew what a game engine was. Rough edges included.",
    status: 'shipped',
  },
  {
    title: 'Python-C++ Chatbot',
    tags: ['Python', 'C++'],
    link: 'https://github.com/Aayushkin/Python-cpp_Chatbot',
    desc: "Hybrid chatbot — conversation logic in Python, the fast paths reimplemented in C++. A systems detour that taught me where latency actually lives.",
    status: 'archived',
  },
  {
    title: 'Face Detector',
    tags: ['ML', 'Computer Vision'],
    link: 'https://aayusx.github.io/Face-Detector',
    desc: "Real-time face detection in the browser — the model runs locally on your device, so your face never leaves your machine. Built to prove the browser could do ML without a server.",
    status: 'shipped',
  },
  {
    title: 'Pentesting Tool',
    tags: ['Security', 'Python'],
    link: 'https://github.com/aayusxat7/pentesting-tool',
    desc: "Security research toolkit. The less said publicly, the better — ask me directly.",
    status: 'classified',
  },
  {
    title: 'Minecraft Mod',
    tags: ['Java', 'Game Modding'],
    link: 'https://github.com/AayusX/Minecraft-mod',
    desc: "Custom Minecraft mod ('Hacker Mod') in Java — my first time modifying a real production codebase, and the fastest way I've found to learn other people's code.",
    status: 'shipped',
  },
  {
    title: 'ChillAura',
    tags: ['UX', 'Wellness'],
    link: 'https://github.com/Aayushkin/ChillAura',
    desc: "Ambient visuals and sound on one quiet page — no accounts, no installs. Built for the five minutes between coding sessions.",
    status: 'shipped',
  },
  {
    title: 'Media Player C',
    tags: ['C', 'Systems'],
    link: 'https://github.com/Aayushkin/Media-Player-C-',
    desc: "Media player built from scratch in C. Buffers, codecs and pain — mostly pain.",
    status: 'archived',
  },
  {
    title: 'Space Adventure',
    tags: ['Physics', 'Games'],
    link: 'https://github.com/Aayushkin/SpaceHack',
    desc: "Space exploration game on real physics ticks — gravity and orbits, no fake physics. Orbital mechanics are the least forgiving code I've written.",
    status: 'shipped',
  },
  {
    title: 'PDF Viewer',
    tags: ['PDF.js', 'JavaScript'],
    link: 'https://aayushkin.github.io/The-Pdf-viewer',
    desc: "PDF reader built on pdf.js — search, zoom, and a reading mode tuned for long documents. Plain static page, no backend.",
    status: 'shipped',
  },
  {
    title: 'Smart Mavi',
    tags: ['Algorithms', 'Automation'],
    link: 'https://github.com/AayusX/Smart_Mavi',
    desc: "Algorithmic automation experiments, written in C++ with no frameworks to hide behind. Named after a very smart bird.",
    status: 'archived',
  },
  {
    title: 'Loan Management System',
    tags: ['Python', 'SQLite', 'Finance'],
    link: 'https://github.com/AayusX/loan-management-system',
    desc: "Loan tracker for my college's teachers' saving group. Replaced the Excel sheets they'd used for years. SQLite, 10% p.a. daily interest calculated exactly as the spreadsheets did, audit log on every action, Excel export. Running on real money since 2023.",
    status: 'production',
  },
  {
    title: 'Mother School',
    tags: ['Full-Stack', 'Education'],
    link: 'https://aama-scl.netlify.app',
    desc: "Complete school platform for Aama Pathshala in Badganga, Kapilvastu. Handles admissions, daily attendance, grade management, report card generation, and parent portal — live on the school's site every day.",
    status: 'production',
  },
];

export const flagshipProjects: FlagshipProject[] = [
  {
    ...allProjects.find(p => p.title === 'Mother School')!,
    whatItDoes: 'Complete school platform for Aama Pathshala in Badganga, Kapilvastu. Handles admissions, daily attendance, grade management, report card generation, and parent portal — live on the school\'s site every day.',
    whyItExists: 'The school ran entirely on paper registers and Excel. Parents had zero visibility. Teachers spent hours manually calculating grades. I built a single system that replaced all of it.',
    myRole: 'Solo full-stack. React + Next.js frontend, Node.js/Express API, PostgreSQL database, deployed on VPS with nginx, SSL, CI/CD. Own the domain, infra, and ongoing maintenance.',
    techStack: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'nginx', 'PM2'],
    metrics: [
      { label: 'Students', value: '200+' },
      { label: 'Daily active', value: 'Live' },
      { label: 'Since', value: '2024' },
    ],
  },
  {
    ...allProjects.find(p => p.title === 'Loan Management System')!,
    whatItDoes: "Loan tracker for my college's teachers' saving group. Replaced the Excel sheets they'd used for years. SQLite backend, 10% p.a. daily interest calculated exactly as the spreadsheets did, audit log on every action, Excel export.",
    whyItExists: "Teachers' saving group managed loans manually in spreadsheets — error-prone, no audit trail, interest calculations drifted. They needed a system that matched their existing math exactly but added accountability.",
    myRole: 'Solo full-stack. Python + SQLite, Tkinter desktop app (single .exe via PyInstaller), exact interest replication, audit logging, Excel export. Running on real money since deployment.',
    techStack: ['Python', 'SQLite', 'Tkinter', 'PyInstaller', 'openpyxl'],
    metrics: [
      { label: 'Teachers', value: '50+' },
      { label: 'Interest rate', value: '10% p.a.' },
      { label: 'Since', value: '2023' },
    ],
  },
  {
    ...allProjects.find(p => p.title === 'FailFirst Engine')!,
    whatItDoes: 'Gamified bug-fixing app that teaches C, C++ and Java by making you debug real code. 60+ challenges with XP, streaks and achievements, packed into a single portable .exe with a bundled compiler.',
    whyItExists: 'Students learn syntax but not debugging. Most courses never show broken code. I built the tool I wished existed — real bugs, real compiler errors, instant feedback, progression that feels like a game.',
    myRole: 'Solo C++/Qt desktop app. Bundled MinGW compiler, custom challenge format, XP/streak system, portable .exe under 50MB. My 2025 school project.',
    techStack: ['C++', 'Qt', 'MinGW', 'CMake', 'Custom parser'],
    metrics: [
      { label: 'Challenges', value: '60+' },
      { label: 'Class of', value: '40' },
      { label: 'Since', value: '2025' },
    ],
  },
];

export const venturesDetail: VentureDetail[] = [
  {
    org: 'YUGYA',
    role: 'Co-Founder',
    tag: 'STARTUP · YUGYA.COM',
    link: 'https://yugya.com',
    cta: 'VISIT YUGYA.COM',
    desc: 'Hosting, domains, VPS, web/app development, security hardening, and Minecraft server hosting — the full digital stack for businesses from small shops up.',
    whatIBuilt: [
      'Automated VPS provisioning pipeline (KVM/LXC) — 3-min spin-up',
      'Domain management: registration, DNS, auto-SSL via Let\'s Encrypt',
      'Security hardening: fail2ban, UFW, ModSecurity, monthly audits',
      'Client portal: billing, resource monitoring, 1-click deploy (WP/Node/Python)',
      'Minecraft server panel: modpack install, backup, monitoring',
      'WHMCS integration for billing/support automation',
    ],
    techStack: ['Go', 'Python', 'Docker', 'Ansible', 'nginx', 'WHMCS', 'PostgreSQL'],
    metrics: [
      { label: 'Domains', value: '200+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Co-founders', value: '3' },
    ],
  },
  {
    org: 'ICT CLUB',
    role: 'President',
    tag: 'LEADERSHIP · TECHNICAL STREAM',
    link: '',
    cta: '',
    desc: 'President of the Technical Stream — running weekly build sessions, workshops, and helping members ship their first real projects.',
    whatIBuilt: [
      'Weekly Build Sessions — 30+ active members, 12 projects shipped',
      'Code & Coffee — biweekly peer code review, 15 regular attendees',
      'HackKTM 2025 — organized 48hr hackathon, 80 participants, 12 projects demoed',
      'Club Dashboard — built member portal (React + Firebase) for events and projects',
      'Mentorship Pairing — matched 20 juniors with seniors on React/C++/Android/AI',
      'Workshop Series — 8 hands-on sessions: Git, React, Docker, ML basics',
    ],
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'GitHub Actions'],
    metrics: [
      { label: 'Active members', value: '30+' },
      { label: 'Projects (2024–25)', value: '12' },
      { label: 'HackKTM participants', value: '80' },
      { label: 'Workshops', value: '8' },
    ],
  },
];

export const stackItems = [
  { mk: 'JS', name: 'JavaScript' },
  { mk: 'TS', name: 'TypeScript' },
  { mk: 'Re', name: 'React' },
  { mk: 'Nx', name: 'Next.js' },
  { mk: '3D', name: 'Three.js / WebGL' },
  { mk: 'Nd', name: 'Node.js' },
  { mk: 'Py', name: 'Python' },
  { mk: 'C+', name: 'C / C++' },
  { mk: 'Jv', name: 'Java' },
  { mk: 'DB', name: 'SQL & Databases' },
  { mk: 'AI', name: 'LLM Agents' },
  { mk: 'CV', name: 'Computer Vision' },
];

export const marqueeTop = [
  'BUILDER', 'LEADER', 'FOUNDER', 'KATHMANDU · REMOTE',
  'CO-FOUNDER · YUGYA', 'PRESIDENT · ICT', '19 SHIPPED', 'SELF-TAUGHT',
];

export const marqueeBottom = [
  'REACT', 'THREE.JS', 'PYTHON', 'C++', 'NODE.JS', 'TYPESCRIPT', 'LLM AGENTS',
  'COMPUTER VISION', 'ANDROID', 'WEBGL', 'SQL', 'SECURITY',
];
