export type Status = 'production' | 'shipped' | 'alive' | 'iterating' | 'archived' | 'classified';

export interface Project {
  title: string;
  tags: string[];
  link: string;
  desc: string;
  status: Status;
}

export interface Featured {
  id: number;
  title: string;
  color: string;
  position: [number, number, number];
  link: string;
}

export const featuredProjects: Featured[] = [
  {
    id: 1,
    title: 'AAYUSH AI',
    color: '#C6FF3D',
    position: [-2.5, 2, 0],
    link: 'https://github.com/AayusX/AayushAI-Core',
  },
  {
    id: 2,
    title: 'FAILFIRST ENGINE',
    color: '#FF5C00',
    position: [0, 3, 0],
    link: 'https://github.com/AayusX/Fail-First---Best-Code-learning-platform-in-gaming-way',
  },
  {
    id: 3,
    title: 'APEX TRADER',
    color: '#41D1FF',
    position: [2.5, 2.5, 0],
    link: 'https://github.com/AayusX/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
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
    desc: 'Personal assistant core (\u2018AayushAGI\u2019) \u2014 voice, long-term memory, a daily journal, reminders and task automation in one Python app. Where I learned RAG and agent tool-calling; it gets rebuilt as I learn.',
    status: 'iterating',
  },
  {
    title: 'FailFirst Engine',
    tags: ['C++', 'Education'],
    link: 'https://github.com/AayusX/Fail-First---Best-Code-learning-platform-in-gaming-way',
    desc: 'Gamified bug-fixing app that teaches C, C++ and Java by making you debug real code. 60+ challenges with XP, streaks and achievements, packed into a single portable .exe with a bundled compiler. My 2025 school project.',
    status: 'shipped',
  },
  {
    title: 'Apex Trader',
    tags: ['Trading', 'Web', 'Android', 'Desktop'],
    link: 'https://github.com/AayusX/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
    desc: 'Cross-platform trading demo \u2014 web, Android and desktop \u2014 for charting, market analysis and paper trades. A practice ground, so you can learn the patterns without risking real money.',
    status: 'shipped',
  },
  {
    title: 'Gesture Solar',
    tags: ['Computer Vision', 'WebGL'],
    link: 'https://aayusxat7.github.io/Gesture-Solar',
    desc: 'Webcam gestures drive a 3D solar system \u2014 all 8 planets with moons, a 1,500-asteroid belt and 3,000 stars. Runs entirely in the browser; nothing to install.',
    status: 'alive',
  },
  {
    title: 'Aayush Bot V1',
    tags: ['TypeScript', 'NLP'],
    link: 'https://github.com/Aayushkin/aayush-bot-v1',
    desc: 'My first chatbot experiments in TypeScript \u2014 hand-rolled NLP before I\u2019d touched an LLM API. Archived now, but it\u2019s where the AI work on this page started.',
    status: 'archived',
  },
  {
    title: 'Best Web Calculator',
    tags: ['JavaScript', 'UI'],
    link: 'https://github.com/Aayushkin/Best-Web-Calculator',
    desc: 'Keyboard-first calculator, zero dependencies, no framework. Arithmetic was never the hard part \u2014 focus order, touch targets and mobile layout were.',
    status: 'shipped',
  },
  {
    title: 'C++ AI Experiments',
    tags: ['C++', 'Algorithms'],
    link: 'https://github.com/Aayushkin/CPP_Ai',
    desc: 'Hand-rolled AI algorithms in native C++ \u2014 no libraries, just math and stubbornness.',
    status: 'archived',
  },
  {
    title: 'JS Game Collection',
    tags: ['JavaScript', 'Canvas', 'Games'],
    link: 'https://aayushkin.github.io/game',
    desc: 'Browser games on raw canvas \u2014 hand-written physics loops before I knew what a game engine was. Rough edges included.',
    status: 'shipped',
  },
  {
    title: 'Python-C++ Chatbot',
    tags: ['Python', 'C++'],
    link: 'https://github.com/Aayushkin/Python-cpp_Chatbot',
    desc: 'Hybrid chatbot \u2014 conversation logic in Python, the fast paths reimplemented in C++. A systems detour that taught me where latency actually lives.',
    status: 'archived',
  },
  {
    title: 'Face Detector',
    tags: ['ML', 'Computer Vision'],
    link: 'https://aayusx.github.io/Face-Detector',
    desc: 'Real-time face detection in the browser \u2014 the model runs locally on your device, so your face never leaves your machine. Built to prove the browser could do ML without a server.',
    status: 'shipped',
  },
  {
    title: 'Pentesting Tool',
    tags: ['Security', 'Python'],
    link: 'https://github.com/aayusxat7/pentesting-tool',
    desc: 'Security research toolkit. The less said publicly, the better \u2014 ask me directly.',
    status: 'classified',
  },
  {
    title: 'Minecraft Mod',
    tags: ['Java', 'Game Modding'],
    link: 'https://github.com/AayusX/Minecraft-mod',
    desc: 'Custom Minecraft mod (\u2018Hacker Mod\u2019) in Java \u2014 my first time modifying a real production codebase, and the fastest way I\u2019ve found to learn other people\u2019s code.',
    status: 'shipped',
  },
  {
    title: 'ChillAura',
    tags: ['UX', 'Wellness'],
    link: 'https://github.com/Aayushkin/ChillAura',
    desc: 'Ambient visuals and sound on one quiet page \u2014 no accounts, no installs. Built for the five minutes between coding sessions.',
    status: 'shipped',
  },
  {
    title: 'Media Player C',
    tags: ['C', 'Systems'],
    link: 'https://github.com/Aayushkin/Media-Player-C-',
    desc: 'Media player built from scratch in C. Buffers, codecs and pain \u2014 mostly pain.',
    status: 'archived',
  },
  {
    title: 'Space Adventure',
    tags: ['Physics', 'Games'],
    link: 'https://github.com/Aayushkin/SpaceHack',
    desc: 'Space exploration game on real physics ticks \u2014 gravity and orbits, no fake physics. Orbital mechanics are the least forgiving code I\u2019ve written.',
    status: 'shipped',
  },
  {
    title: 'PDF Viewer',
    tags: ['PDF.js', 'JavaScript'],
    link: 'https://aayushkin.github.io/The-Pdf-viewer',
    desc: 'PDF reader built on pdf.js \u2014 search, zoom and a reading mode tuned for long documents. Plain static page, no backend.',
    status: 'shipped',
  },
  {
    title: 'Smart Mavi',
    tags: ['Algorithms', 'Automation'],
    link: 'https://github.com/AayusX/Smart_Mavi',
    desc: 'Algorithmic automation experiments, written in C++ with no frameworks to hide behind. Named after a very smart bird.',
    status: 'archived',
  },
  {
    title: 'Loan Management System',
    tags: ['Python', 'SQLite', 'Finance'],
    link: 'https://github.com/AayusX/loan-management-system',
    desc: 'Loan tracker for my college\u2019s teachers\u2019 saving group \u2014 replaced the Excel sheets they\u2019d used for years. SQLite, 10% p.a. daily interest exactly as the spreadsheets did it, an audit log on every action, Excel export. Running on real money.',
    status: 'production',
  },
  {
    title: 'Mother School',
    tags: ['Full-Stack', 'Education'],
    link: 'https://aama-scl.netlify.app',
    desc: 'School platform for Aama Pathshala \u2014 a real school in Badganga, Kapilvastu. Admissions to report cards, live on the school\u2019s site every day.',
    status: 'production',
  },
];

export const ventures = [
  {
    org: 'YUGYA',
    role: 'Co-Founder',
    tag: 'STARTUP · YUGYA.COM',
    link: 'https://yugya.com',
    cta: 'VISIT YUGYA',
    desc: 'Hosting, domain and VPS management, website development, security hardening and Minecraft server hosting \u2014 the full digital stack for businesses from small shops up. Live at yugya.com, built with two co-founders.',
  },
  {
    org: 'ICT CLUB',
    role: 'President',
    tag: 'LEADERSHIP · TECHNICAL STREAM',
    link: '',
    cta: '',
    desc: 'President of my college\u2019s ICT Club (Technical Stream) \u2014 organizing events and workshops and helping members ship their first serious builds.',
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
  'FULL-STACK DEVELOPER', 'AI ENGINEER', 'KATHMANDU · REMOTE', 'OPEN TO INTERNSHIPS',
  'CO-FOUNDER · YUGYA', '19 PROJECTS SHIPPED', 'SELF-TAUGHT', 'C++ & SYSTEMS',
];

export const marqueeBottom = [
  'REACT', 'THREE.JS', 'PYTHON', 'C++', 'NODE.JS', 'TYPESCRIPT', 'LLM AGENTS',
  'COMPUTER VISION', 'ANDROID', 'WEBGL', 'SQL', 'SECURITY',
];