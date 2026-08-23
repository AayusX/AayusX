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
    link: 'https://github.com/AayusX-Pro/FailFirst',
  },
  {
    id: 3,
    title: 'APEX TRADER',
    color: '#41D1FF',
    position: [2.5, 2.5, 0],
    link: 'https://aayusx.github.io/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
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
    desc: 'My own assistant core — LLM agents, memory and tool-calling wired into a single Python brain.',
    status: 'iterating',
  },
  {
    title: 'FailFirst Engine',
    tags: ['C++', 'Education'],
    link: 'https://github.com/AayusX-Pro/FailFirst',
    desc: 'A C++ engine that teaches by letting you fail gloriously first. Built for CS students who hate tutorials.',
    status: 'shipped',
  },
  {
    title: 'Apex Trader',
    tags: ['Trading', 'Web', 'Android', 'Desktop'],
    link: 'https://aayusx.github.io/Apex-Trader--The-trading-demo-app-for-web-android-and-desktop',
    desc: 'Cross-platform trading demo app for web, Android and desktop. Charts, paper trades, zero real money lost.',
    status: 'shipped',
  },
  {
    title: 'Gesture Solar',
    tags: ['Computer Vision', 'WebGL'],
    link: 'https://aayusxat7.github.io/Gesture-Solar',
    desc: 'Control a solar system with your bare hands. Webcam gestures drive an interactive 3D simulation.',
    status: 'alive',
  },
  {
    title: 'Aayush Bot V1',
    tags: ['TypeScript', 'NLP'],
    link: 'https://github.com/Aayushkin/aayush-bot-v1',
    desc: 'Early NLP chatbot experiments in TypeScript. Where my obsession with conversational AI started.',
    status: 'archived',
  },
  {
    title: 'Best Web Calculator',
    tags: ['JavaScript', 'UI'],
    link: 'https://aayushkin.github.io/Best-Web-Calculator',
    desc: 'Keyboard-accessible calculator that actually feels good to use. Small, fast, zero dependencies.',
    status: 'shipped',
  },
  {
    title: 'C++ AI Experiments',
    tags: ['C++', 'Algorithms'],
    link: 'https://github.com/Aayushkin/CPP_Ai',
    desc: 'Hand-rolled AI algorithms in native C++ — no libraries, just math and stubbornness.',
    status: 'archived',
  },
  {
    title: 'JS Game Collection',
    tags: ['JavaScript', 'Canvas', 'Games'],
    link: 'https://aayushkin.github.io/game',
    desc: 'Browser games built on raw canvas APIs. Physics loops before I knew what a game engine was.',
    status: 'shipped',
  },
  {
    title: 'Python-C++ Chatbot',
    tags: ['Python', 'C++'],
    link: 'https://github.com/Aayushkin/Python-cpp_Chatbot',
    desc: 'Hybrid chatbot bridging Python flexibility with C++ speed. A systems-programming detour.',
    status: 'archived',
  },
  {
    title: 'Face Detector',
    tags: ['ML', 'Computer Vision'],
    link: 'https://aayusx.github.io/Face-Detector',
    desc: 'Real-time face detection running fully in the browser. Your face never leaves your machine.',
    status: 'shipped',
  },
  {
    title: 'Pentesting Tool',
    tags: ['Security', 'Python'],
    link: 'https://github.com/aayusxat7/pentesting-tool',
    desc: 'Security research toolkit. The less said publicly, the better — ask me directly.',
    status: 'classified',
  },
  {
    title: 'Minecraft Mod',
    tags: ['Java', 'Game Modding'],
    link: 'https://github.com/AayusX/Minecraft-mod',
    desc: 'Custom Minecraft mod written in Java. My first taste of modifying a real production codebase.',
    status: 'shipped',
  },
  {
    title: 'ChillAura',
    tags: ['UX', 'Wellness'],
    link: 'https://aayushkin.github.io/ChillAura',
    desc: 'A calm corner of the internet — ambient visuals and sound designed to lower your heart rate.',
    status: 'shipped',
  },
  {
    title: 'Media Player C',
    tags: ['C', 'Systems'],
    link: 'https://github.com/Aayushkin/Media-Player-C-',
    desc: 'Media player built from scratch in C. Buffers, codecs and pain — mostly pain.',
    status: 'archived',
  },
  {
    title: 'Space Adventure',
    tags: ['Physics', 'Games'],
    link: 'https://aayushkin.github.io/SpaceHack',
    desc: 'Space exploration game with real physics ticks. Orbital mechanics are hard; I shipped anyway.',
    status: 'shipped',
  },
  {
    title: 'PDF Viewer',
    tags: ['PDF.js', 'JavaScript'],
    link: 'https://aayushkin.github.io/The-Pdf-viewer',
    desc: 'Clean PDF reader built on pdf.js with search, zoom and a reading mode people actually use.',
    status: 'shipped',
  },
  {
    title: 'Smart Mavi',
    tags: ['Algorithms', 'Automation'],
    link: 'https://github.com/AayusX/Smart_Mavi',
    desc: 'Algorithmic automation experiments. Named after a very smart bird.',
    status: 'archived',
  },
  {
    title: 'Loan Management System',
    tags: ['Full-Stack', 'Finance'],
    link: 'https://github.com/AayusX/loan-management-system',
    desc: 'Production finance system tracking loans end-to-end. Real users, real money, real consequences.',
    status: 'production',
  },
  {
    title: 'Mother School',
    tags: ['Full-Stack', 'Education'],
    link: 'https://github.com/AayusX/Mother-school',
    desc: 'Complete school management platform — admissions to report cards — serving a working school.',
    status: 'production',
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
  'FULL-STACK DEVELOPER', 'AI ENGINEER', 'KATHMANDU → WORLDWIDE', 'OPEN TO INTERNSHIPS',
  'CO-FOUNDER READY', '18 PROJECTS SHIPPED', 'SELF-TAUGHT', 'SYSTEMS THINKER',
];

export const marqueeBottom = [
  'REACT', 'THREE.JS', 'PYTHON', 'C++', 'NODE.JS', 'TYPESCRIPT', 'LLM AGENTS',
  'COMPUTER VISION', 'ANDROID', 'WEBGL', 'SQL', 'SECURITY',
];
