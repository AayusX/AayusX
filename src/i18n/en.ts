/**
 * English copy — the canonical translation resource.
 * Nepali (`ne.ts`) is typed against this object, so a missing or extra key
 * fails the TypeScript build.
 */
export const en = {
  common: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    menu: 'Menu',
    language: 'Language',
    english: 'English',
    nepali: 'नेपाली',
    switchToEnglish: 'Switch to English',
    switchToNepali: 'Switch to Nepali',
    loading: 'Loading',
    errorTitle: 'Something went wrong.',
    errorBody: 'This part of the page failed to load. Reloading usually fixes it.',
    reload: 'Reload page',
    goHome: 'Go to the home page',
    backToTop: 'Back to top',
    external: 'opens in a new tab',
    readMore: 'Read more',
    readCaseStudy: 'Read the case study',
    viewProject: 'View project',
    viewLive: 'View live',
    viewCode: 'Source code',
    allProjects: 'All projects',
    previous: 'Previous',
    next: 'Next',
    year: 'Year',
    role: 'Role',
    stack: 'Stack',
    status: 'Status',
    links: 'Links',
    technologies: 'Technologies',
    published: 'Published',
    updated: 'Updated',
    minRead: '{{count}} min read',
    featured: 'Featured',
    ongoing: 'Ongoing',
    present: 'Present',
    emailMe: 'Email me',
    available: 'Building with Yugya · open to collaboration',
    statuses: {
      production: 'In production',
      shipped: 'Shipped',
      iterating: 'Iterating',
      archived: 'Archived',
      classified: 'Private',
    },
  },

  nav: {
    home: 'Home',
    about: 'About',
    journey: 'Journey',
    projects: 'Projects',
    experiments: 'Experiments',
    capabilities: 'Capabilities',
    writing: 'Writing',
    contact: 'Contact',
    primaryLabel: 'Primary navigation',
    footerLabel: 'Footer navigation',
    replayIntro: 'Replay intro',
  },

  intro: {
    label: 'A world in motion',
    eyebrow: 'Aayush Bhandari · Nepal',
    title: 'AayusX',
    lead: 'A portfolio built around useful software, a Nepali kite, and the next thing worth making.',
    skip: 'Skip intro',
    enter: 'Enter the portfolio',
    replay: 'Replay intro',
    photoAlt: 'Portrait of Aayush Bhandari',
    photoCaption: 'Aayush Bhandari, the person behind AayusX',
    memories: [
      { year: '2023', text: 'A loan ledger for my teachers goes digital.' },
      { year: '2024', text: 'A school in Badganga starts running on software I built.' },
      { year: '2024–25', text: 'A club of builders learns to ship together.' },
      { year: '2025', text: 'A classroom learns by fixing broken code.' },
      { year: 'Now', text: 'Yugya, new ideas, and the next useful thing.' },
    ],
    finalLine: 'The rest is the work.',
    reducedMotionNote: 'The introduction is simplified because reduced motion is enabled.',
  },

  home: {
    eyebrow: 'Aayush Bhandari · Nepal',
    titleBefore: 'I build software for',
    titleEmphasis: 'schools',
    titleAfter: 'and small businesses.',
    intro:
      'I’m a Computer Engineering student and technology entrepreneur. I design and build web platforms, desktop tools, and small AI systems, usually for schools, small businesses, and problems I can’t stop thinking about.',
    ctaWork: 'See selected work',
    ctaAbout: 'More about me',
    portraitAlt: 'Portrait of Aayush Bhandari',
    portraitCaption: 'Aayush Bhandari / AayusX',
    portraitNote: 'Nepal · building remotely',
    mascotLabel: 'Changa / cursor companion',
    mascotNote: 'A Nepali kite tethered to the pointer. It follows, loops, and dips.',
    currentlyLabel: 'Currently',
    currentlyText:
      'Co-founding Yugya, studying Computer Engineering, and maintaining a school platform that runs every day.',
    selectedLabel: 'Selected work',
    selectedTitle: 'Work with a real user on the other side.',
    selectedIntro:
      'A school, a savings group, a classroom, a browser experiment. Each one started with a constraint I could not design around.',
    viewAll: 'All projects',
    aboutLabel: 'About',
    aboutTitle: 'Between product sense and engineering.',
    aboutBody:
      'I care about the unglamorous parts: audit trails, report cards that print correctly, setup that does not scare a first-time user. The best compliment my work can get is that it quietly became part of someone’s day.',
    aboutLink: 'Read the longer version',
    capabilitiesLabel: 'Toolkit',
    capabilitiesTitle: 'What I can build, and with what.',
    capabilitiesBody:
      'Web products, desktop tools, data-backed systems, and selective AI features. No proficiency scores: just the tools I have actually shipped with.',
    capabilitiesLink: 'Explore capabilities',
    writingLabel: 'Writing',
    writingTitle: 'Notes from the work.',
    writingLink: 'All writing',
    contactLabel: 'Contact',
    contactTitle: 'Join the community, or build with us.',
    contactBody:
      'If you want to learn and build with the community, or bring a project to Yugya, start here. Tell me what you want to make and where you fit.',
    contactCta: 'Start a conversation',
    indexLabel: 'Index',
    index: ['Selected work', 'About', 'Capabilities', 'Writing', 'Contact'],
  },

  about: {
    eyebrow: 'Background',
    title: 'About Aayush.',
    lede: 'I’m Aayush Bhandari. I build practical software, study Computer Engineering, and run a small technology company with friends.',
    story: [
      'I grew up in Nepal, where good software often looks like a spreadsheet with extra steps. That gap is what pulled me in. I started by taking apart games and rebuilding small tools; eventually I was writing the tools other people relied on.',
      'Today I work under the name AayusX. I co-founded Yugya, a small technology company offering hosting, domains, VPS infrastructure, and web development. In 2024–25 I served as President of my college’s ICT Club (Technical Stream), running build sessions, workshops, and HackKTM 2025.',
      'My work sits between product and engineering. I like the parts nobody demos: an audit trail on a loan payment, a report card that prints correctly, a compiler bundled so a student can learn without setup. I’m most useful when the problem is real and the deadline is not theoretical.',
      'Right now I’m interested in tools that make technical work legible to non-technical people, and in AI systems that stay small, local, and honest about what they can do.',
    ],
    portraitAlt: 'Portrait of Aayush Bhandari',
    portraitCaption: 'Aayush Bhandari, Nepal.',
    valuesLabel: 'How I work',
    valuesTitle: 'Three rules I keep coming back to.',
    values: [
      {
        title: 'Boring where it matters',
        body: 'If software handles money, records, or a student’s day, reliability matters more than novelty. I choose the well-understood tool and document the exception.',
      },
      {
        title: 'Ship, then listen',
        body: 'A deployed system teaches you things a prototype cannot. Production feedback is the only review that counts, especially when the user is not technical.',
      },
      {
        title: 'Explain the trade-off',
        body: 'Clear constraints are part of the product. I would rather say what a system cannot do than let someone discover it at the worst moment.',
      },
    ],
    factsLabel: 'At a glance',
    facts: [
      { label: 'Education', value: 'Computer Engineering student' },
      { label: 'Based in', value: 'Nepal · working remotely' },
      { label: 'Building', value: 'Co-founder, Yugya' },
      { label: 'Led', value: 'President, ICT Club (Technical Stream), 2024–25' },
    ],
    connectLabel: 'Work together',
    connectTitle: 'Build with us, not for me.',
    connectBody:
      'If you want to join the community, collaborate on a project, or work with Yugya on hosting, infrastructure, or software, write to me and tell me what you want to build.',
    connectCta: 'Start a conversation',
    quote:
      '“The goal is not to make the website look complicated. The goal is to make every detail feel considered.”',
    quoteSource: 'A note I keep above my desk',
  },

  journey: {
    eyebrow: 'Timeline',
    title: 'What I’ve built so far.',
    lede: 'Each entry is a project or role that changed how I work. Dates appear only where they are verified.',
    note: 'Only milestones the repository can verify appear here. No awards, revenue, or client claims were invented.',
    milestonesLabel: 'Milestones',
    milestones: [
      {
        year: '2023',
        title: 'The loan ledger goes digital',
        body: 'My college’s teachers’ saving group ran on Excel: error-prone, hard to audit, and fragile when the person who understood the formulas was away. I built a Python desktop system that matched their 10% p.a. daily-interest math exactly, added an audit log, and exported the reports they already knew how to read.',
        why: 'It was the first time real money depended on code I wrote. It taught me that “correct” is a social requirement, not only a technical one.',
      },
      {
        year: '2024',
        title: 'A school starts running on it',
        body: 'Aama Pathshala in Badganga, Kapilvastu needed more than a website. Admissions, attendance, grades, report cards, and a parent portal were spread across paper and spreadsheets. I built the platform end to end and deployed it on a VPS with nginx, SSL, and a repeatable release process.',
        why: 'It moved my work from “a tool someone uses” to “a system a school depends on every morning”.',
      },
      {
        year: '2024–25',
        title: 'Leading a club of builders',
        body: 'As President of the ICT Club (Technical Stream), I ran weekly build sessions, peer code reviews, workshops, and HackKTM 2025. The work was less about my code and more about making it possible for other people to finish theirs.',
        why: 'I learned that leadership is mostly removing obstacles and keeping a room honest about what is actually working.',
      },
      {
        year: '2025',
        title: 'A classroom learns by failing',
        body: 'FailFirst Engine was my school project: a gamified C, C++ and Java debugger with 60+ broken-code challenges, XP, streaks, and a bundled compiler in a single portable executable. I built it because my own learning had been full of syntax and empty of debugging practice.',
        why: 'It proved I could carry a product from a pedagogical idea to a distributable artifact without a team or a budget.',
      },
      {
        year: 'Ongoing',
        title: 'Building Yugya',
        body: 'I co-founded Yugya, a technology company offering hosting, domains, VPS infrastructure, web and app development, and security hardening. My work spans provisioning automation, DNS and SSL, client tooling, and the parts of operations that have to be reliable before they can be interesting.',
        why: 'It puts me on the other side of the table: not only writing software, but being responsible for it after launch.',
      },
      {
        year: 'Ongoing',
        title: 'Experiments that keep me curious',
        body: 'Gesture Solar turns webcam gestures into a browser-rendered solar system. AayushAI Core is a personal assistant experiment with voice, memory, journaling, and tool calling. These projects are where I learn in public and keep the engineering playful.',
        why: 'They are a reminder that curiosity is a maintenance practice, not a personality trait.',
      },
    ],
    closingTitle: 'What comes next',
    closingBody:
      'I want to meet people who want to build: through the community, on a shared project, or with Yugya. If that is you, the next step is a conversation.',
    closingCta: 'Start a conversation',
  },

  projects: {
    eyebrow: 'Work',
    title: 'Selected work.',
    lede: 'Four case studies and a working archive. The case studies focus on the problem, my role, and what changed after launch. The archive holds earlier, smaller, or unfinished things.',
    filterLabel: 'Filter projects by status',
    filterAll: 'All',
    featuredLabel: 'Case studies',
    archiveLabel: 'The archive',
    archiveTitle: 'Everything else.',
    archiveIntro:
      'Smaller tools, earlier experiments, and work that is no longer maintained. Status is stated plainly; archived does not mean deleted.',
    noResults: 'No projects match this filter.',
    archiveStatusNote: 'Only projects with a verified public link are listed.',
    caseStudyLabel: 'Case study',
    mediaNote: 'Demo footage supplied with the project. No interface mockups.',
    noMediaNote: 'No screenshot was supplied for this project. The cover is typographic, not a mockup.',
    openLive: 'Open the live project',
    relatedLabel: 'Other work',
    nextProject: 'Next project',
    previousProject: 'Previous project',
    details: 'Project details',
    items: {
      'mother-school': {
        title: 'Mother School',
        subtitle: 'Aama Pathshala',
        category: 'Education platform',
        summary:
          'A complete school platform for Aama Pathshala in Badganga, Kapilvastu: admissions, attendance, grades, report cards, and a parent portal.',
        description:
          'The school ran on paper registers and spreadsheets. Parents had little visibility, teachers calculated grades by hand, and every new term re-created the same administrative work. I built one system for the whole school and kept it running after launch.',
        role: 'Solo full-stack developer. Frontend, API, database, deployment, domain, SSL, and ongoing maintenance.',
        outcomes: [
          'Admissions, daily attendance, grade management, and report-card generation in one place',
          'A parent portal for visibility into attendance and results',
          'Deployed on a VPS with nginx, SSL, and a repeatable release process',
          'In daily production use at the school since 2024',
        ],
        context:
          'Aama Pathshala is a real school with real term deadlines. The system could not be “almost ready” at the start of a term. That constraint shaped every decision: simple flows, visible errors, and reports that print the way the school already expects.',
        approach:
          'I mapped the existing paper process first, then built the smallest system that could replace it without changing how teachers think about their day. Admissions and attendance came first; grades and report cards followed once the data was trustworthy.',
        result:
          'The platform is live and used for daily school operations. It is also the project that taught me the most about maintenance: the unglamorous work of backups, releases, and answering a teacher’s question on a Monday morning.',
      },
      'loan-management': {
        title: 'Loan Management System',
        subtitle: 'Teachers’ savings group',
        category: 'Finance tool',
        summary:
          'A Python desktop system that replaced years of Excel sheets for my college’s teachers’ saving group: exact interest math, a full audit log, and Excel export.',
        description:
          'The saving group managed loans in spreadsheets. Interest calculations drifted, there was no audit trail, and knowledge lived with one person. The replacement had to match the existing 10% p.a. daily-interest math exactly while adding accountability.',
        role: 'Solo developer. Desktop application, database design, interest calculation, audit logging, reporting, and packaging.',
        outcomes: [
          'Exact replication of the group’s 10% p.a. daily-interest calculation',
          'An audit log for every action that affects a loan or payment',
          'Excel export for the reports members already understood',
          'Single portable executable distributed to the group',
          'Running on real money since 2023',
        ],
        context:
          'This was not a greenfield product. The group had years of history and a calculation method everyone trusted. Changing the math, even to a “better” method, would have broken trust. The specification was the spreadsheet.',
        approach:
          'I treated the existing workbook as the source of truth, wrote the calculation rules down, and built tests around real historical cases. The interface stayed deliberately plain: the people using it needed confidence, not novelty.',
        result:
          'The system has been in production since 2023. It is the project I point to when someone asks whether I can work with legacy constraints without quietly redesigning them.',
      },
      'failfirst-engine': {
        title: 'FailFirst Engine',
        subtitle: 'Debug-first learning',
        category: 'Education · Desktop',
        summary:
          'A gamified C, C++ and Java learning tool built around broken code: 60+ challenges, XP, streaks, and a bundled compiler in one portable executable.',
        description:
          'Most programming courses teach syntax and never show a realistic failure. FailFirst Engine makes debugging the curriculum: students receive broken code, real compiler errors, and immediate feedback, with progression that feels like a game.',
        role: 'Solo developer. Challenge design, desktop application, custom challenge format, progression system, and portable packaging.',
        outcomes: [
          '60+ debugging challenges across C, C++ and Java',
          'XP, streaks, and achievements for progression',
          'Bundled MinGW compiler so no setup is required',
          'A single portable executable for classroom distribution',
          'Built as a 2025 school project and shipped',
        ],
        context:
          'A classroom has fifteen minutes and one teacher. Anything that requires installing a compiler, configuring a path, or creating an account loses half the room. The product had to run immediately from one file.',
        approach:
          'I designed challenges around common misconceptions rather than trivia, then wrapped them in a progression loop. The bundled compiler was the hardest engineering constraint, and the reason the tool works in a real classroom.',
        result:
          'Shipped as a self-contained executable for students. More importantly, it changed how I think about teaching: failure is not an interruption to learning; it is the material.',
      },
      'gesture-solar': {
        title: 'Gesture Solar',
        subtitle: 'Webcam → solar system',
        category: 'Experiment · WebGL',
        summary:
          'A browser experiment where webcam gestures drive a 3D solar system: eight planets, moons, an asteroid belt, and thousands of stars, with nothing to install.',
        description:
          'Built to answer a simple question: can a browser feel like a physical instrument without a controller? The scene renders locally with WebGL and responds to hand movement through the webcam. No server, no account, no app store.',
        role: 'Solo developer. Computer-vision input, 3D scene, interaction design, and browser performance.',
        outcomes: [
          'Webcam gesture input entirely in the browser',
          'Eight planets with moons, a 1,500-asteroid belt, and 3,000 stars',
          'Live and playable without installation',
        ],
        context:
          'The interesting part was not the solar system; it was latency. A gesture that arrives a second late feels broken, no matter how good the graphics are. I spent most of the effort on the input pipeline and a scene budget that could hold a stable frame rate.',
        approach:
          'Keep the scene procedural, cap the particle counts, and make the interaction obvious without a tutorial. The interface is a single instruction: move your hand.',
        result:
          'A live experiment that still demonstrates the point: the browser can be a credible medium for embodied interaction.',
      },
      'aayushai-core': {
        title: 'AayushAI Core',
        subtitle: 'Personal assistant experiment',
        category: 'Experiment · AI',
        summary:
          'A Python assistant experiment with voice, long-term memory, a daily journal, reminders, and task automation, where I learned RAG and agent tool-calling.',
        description:
          'Not a product, and not pretending to be one. A personal system for exploring how an assistant can remember context, act on tools, and stay understandable as it grows. It gets rebuilt as my understanding improves.',
        role: 'Solo developer. Retrieval, memory model, tool calling, local voice loop, and experiment design.',
        outcomes: [
          'Retrieval-augmented memory over personal notes and journal entries',
          'Tool-calling flows for reminders and small automations',
          'A local voice loop for hands-free interaction',
          'Continuously rebuilt; not presented as production software',
        ],
        context:
          'Most assistant demos are a chat box with a prompt. I wanted to understand the harder parts: what to remember, when to retrieve it, and how to keep a tool call from becoming an unreviewable action.',
        approach:
          'Keep the system local-first, log every tool call, and treat memory as an editable artifact rather than an invisible model state. The project is deliberately unfinished.',
        result:
          'An ongoing learning system. Its value is the understanding it produces, not a launch date.',
      },
    },
  },

  caseStudy: {
    label: 'Case study',
    context: 'The problem',
    role: 'My role',
    approach: 'The approach',
    outcome: 'What shipped',
    stack: 'Stack',
    links: 'Project links',
    result: 'What it changed',
    note: 'No invented screenshots, metrics, or client quotes. The cover is a typographic composition; demo footage is genuine where shown.',
    backToProjects: 'Back to projects',
  },

  experiments: {
    eyebrow: 'Lab',
    title: 'Things I’m testing.',
    lede: 'Prototypes, interaction studies, and things built to answer a question. Nothing here is pretending to be a finished product.',
    note: 'Heavy and interactive experiments load only when you ask for them. Reduced-motion preferences are respected.',
    statusExperimental: 'Experimental',
    statusOngoing: 'Ongoing',
    launchPhysics: 'Launch physics playground',
    closePhysics: 'Close physics playground',
    physicsTitle: 'Physics playground',
    physicsBody:
      'Three project blocks, real rigid-body physics, drag and throw. This is the old hero rebuilt as an opt-in experiment, loaded in a separate JavaScript chunk.',
    physicsHint: 'Drag a block. Throw it. The scene pauses when closed.',
    physicsMobile: 'The 3D experiment is available on larger screens. The rest of the site remains fully available.',
    physicsNoWebgl: 'This browser does not expose WebGL, so the 3D scene is unavailable. Everything else still works.',
    terminalTitle: 'AayusX shell',
    terminalBody:
      'A small command interface to the same facts. Keyboard-first, with quick commands for anyone who does not want to type.',
    terminalLabel: 'Interactive terminal',
    terminalInput: 'Terminal command',
    terminalQuick: 'Quick commands',
    terminalBanner: 'aayusx shell — a small, honest interface.',
    terminalHint: 'Type “help” to begin.',
    gestureTitle: 'Gesture Solar',
    gestureBody:
      'Webcam gestures control a browser-built solar system. A study in latency, interaction, and performing 3D without an install.',
    gestureCta: 'Open the live experiment',
    gestureMediaNote: 'Existing demo footage. Loads only when played.',
    aiTitle: 'AayushAI Core',
    aiBody:
      'A local-first assistant experiment: memory, journaling, reminders, and tool calling. Unfinished on purpose.',
    aiCta: 'View the repository',
    memoryGameTitle: 'Memory game study',
    memoryGameBody:
      'A short visual study of a small browser game. Included as an experiment record, not as a shipped project.',
    memoryGameNote: 'Existing repository demo. No public project link is documented.',
    backToTop: 'Back to experiments',
  },

  terminal: {
    whoami: 'Aayush Bhandari (AayusX) — Computer Engineering student, co-founder of Yugya, builder of useful software. Nepal.',
    helpTitle: 'Available commands',
    help: [
      'whoami       who is behind AayusX',
      'projects     list the selected work',
      'stack        technologies in use',
      'contact      open a channel',
      'uptime       how long this session has been open',
      'clear        clear the output',
    ],
    projectsTitle: 'Selected work',
    stackTitle: 'Technologies in use',
    contactTitle: 'Contact',
    contactBody: 'Email is the fastest route: {{email}}',
    notFound: 'Command not found: {{command}}. Try “help”.',
    uptimeLabel: 'Session open for {{seconds}} seconds.',
    cleared: 'Output cleared.',
    prompt: 'visitor@aayusx:~$',
  },

  capabilities: {
    eyebrow: 'Toolkit',
    title: 'What I work with.',
    lede: 'Capabilities grouped by the kind of problem, with the tools I have actually used to ship. No percentages, no star ratings, no invented proficiency levels.',
    note: 'Logos are authentic brand marks from Simple Icons and retain their official colours. Their presence indicates use in documented work, not a certification.',
    categories: [
      {
        title: 'Web products',
        body: 'Editorial frontends, dashboards, portals, and APIs that people can use without training. I care about loading states, empty states, and the second visit as much as the first.',
        tech: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'SQLite', 'Tailwind CSS'],
        proof: 'Mother School',
        proofSlug: 'mother-school',
      },
      {
        title: 'Desktop & systems',
        body: 'Native tools that have to work offline, handle real files, or run on a machine with no internet. Packaging and distribution are part of the job, not an afterthought.',
        tech: ['Python', 'C', 'C++', 'Java', 'Qt', 'Git', 'Linux', 'Docker'],
        proof: 'FailFirst Engine',
        proofSlug: 'failfirst-engine',
      },
      {
        title: 'AI & computer vision',
        body: 'Small, inspectable AI features: retrieval, agent tool use, browser-based vision, and automation. I am more interested in reliability than in demos that only work once.',
        tech: ['Python', 'LLM agents', 'RAG', 'Computer vision', 'JavaScript'],
        proof: 'Gesture Solar',
        proofSlug: 'gesture-solar',
      },
      {
        title: 'Product & operations',
        body: 'Hosting, DNS, SSL, deployments, monitoring, and the maintenance work that keeps a product alive. Also the product judgement to decide what not to build.',
        tech: ['Yugya', 'nginx', 'VPS', 'DNS', 'SSL', 'Security hardening'],
        proof: 'Yugya',
        proofSlug: '',
      },
    ],
    toolsLabel: 'Tools in documented use',
    proofLabel: 'See it in',
    principlesLabel: 'How I choose a stack',
    principles: [
      'The smallest tool that can carry the maintenance burden.',
      'Boring infrastructure for anything that handles money or records.',
      'A clear upgrade path before the first user arrives.',
      'Measure before adding a dependency or a layer.',
    ],
    notListedTitle: 'What is deliberately absent',
    notListedBody:
      'No percentage bars, no “expert” badges, no list of every framework I have opened once. If a tool is not represented in a shipped or documented project, it does not belong here as a capability claim.',
  },

  writing: {
    eyebrow: 'Essays',
    title: 'Notes from the work.',
    lede: 'Essays about constraints, maintenance, and the parts of software that do not fit in a demo. Written from projects that actually shipped.',
    featuredLabel: 'Featured',
    archiveLabel: 'Archive',
    readArticle: 'Read the essay',
    empty: 'No essays have been published yet.',
    tagsLabel: 'Topics',
    all: 'All topics',
    backToWriting: 'Back to writing',
    articleNote: 'Written for this portfolio. No external publication date is implied.',
    relatedLabel: 'Continue reading',
  },

  articles: {
    'the-spreadsheet-was-the-specification': {
      title: 'The spreadsheet was the specification',
      description:
        'Replacing a teachers’ savings-group workbook without breaking the math everyone trusted, and why the audit log mattered more than the interface.',
      category: 'Engineering',
      date: '2026-11-01',
      readingTime: 5,
    },
    'teach-debugging-not-just-syntax': {
      title: 'Teach debugging, not just syntax',
      description:
        'Why FailFirst Engine makes broken code the curriculum, and what a bundled compiler taught me about designing for real classrooms.',
      category: 'Education',
      date: '2026-10-15',
      readingTime: 4,
    },
    'what-a-school-taught-me-about-boring-software': {
      title: 'What a school taught me about boring software',
      description:
        'Attendance, report cards, backups, and a Monday-morning question: the maintenance lessons from running a school platform in production.',
      category: 'Product',
      date: '2026-09-28',
      readingTime: 5,
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Tell me what you’re building.',
    lede: 'The best first message is specific: what you are building, who it is for, and where it is stuck. I read everything and reply when I can help.',
    availability: 'Join the community · Collaborate · Work with Yugya',
    directLabel: 'Direct',
    emailLabel: 'Email',
    socialLabel: 'Elsewhere',
    locationLabel: 'Location',
    locationValue: 'Nepal · working remotely',
    responseNote: 'I usually reply within a few working days. No newsletters, no automated sequences.',
    formLabel: 'Send a message',
    formHint: 'Fields marked with an asterisk are required.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'What is this about?',
    message: 'Message',
    messagePlaceholder: 'What are you building, and where is it stuck?',
    submit: 'Send message',
    submitting: 'Sending…',
    successTitle: 'Message sent.',
    successBody: 'Thank you. It reached me, and I will reply to the address you provided.',
    errorTitle: 'The message did not send.',
    errorBody: 'Something failed on the way. You can email me directly instead; the link below is pre-filled with what you wrote.',
    fallbackCta: 'Email this message instead',
    retry: 'Try again',
    sendAnother: 'Send another message',
    validation: {
      nameRequired: 'Please enter your name.',
      nameLong: 'Please keep your name under 100 characters.',
      emailRequired: 'Please enter an email address.',
      emailInvalid: 'Please enter a valid email address.',
      subjectRequired: 'Please add a subject.',
      subjectLong: 'Please keep the subject under 160 characters.',
      messageRequired: 'Please write a message.',
      messageShort: 'Please add a little more detail (at least 20 characters).',
      messageLong: 'Please keep the message under 4,000 characters.',
      formError: 'Please fix the highlighted fields.',
    },
    privacy:
      'Your details are used only to reply to this message. They are not stored in a database or added to a mailing list.',
    spamNote: 'This form uses server-side validation, a honeypot field, and an optional challenge to reduce spam.',
    captchaLabel: 'Spam protection',
    captchaNote: 'If the challenge does not appear, you can still email me directly.',
  },

  footer: {
    statement:
      'AayusX is the personal technology practice of Aayush Bhandari. Software for schools, small businesses, and curious experiments.',
    navigationLabel: 'Navigate',
    elsewhereLabel: 'Elsewhere',
    contactLabel: 'Contact',
    copyright: '© {{year}} Aayush Bhandari. Built with care in Nepal.',
    builtWith: 'Vite, React, TypeScript, and a refusal to ship a demo as a product.',
    replayIntro: 'Replay the introduction',
    mascotOn: 'Cursor mascot on',
    mascotOff: 'Cursor mascot off',
    backToTop: 'Back to top',
    sourceNote: 'No analytics, no advertising, no cookies for tracking.',
  },

  seo: {
    defaultTitle: 'AayusX — Aayush Bhandari',
    defaultDescription:
      'Aayush Bhandari (AayusX) is a Computer Engineering student and technology entrepreneur in Nepal, building useful web platforms, desktop tools, and small AI systems.',
    home: {
      title: 'AayusX — Aayush Bhandari, technology entrepreneur in Nepal',
      description:
        'Aayush Bhandari (AayusX) builds useful software for schools and small businesses: web platforms, desktop tools, and small AI systems. Computer Engineering student and co-founder of Yugya.',
    },
    about: {
      title: 'About Aayush Bhandari — AayusX',
      description:
        'The person behind AayusX: a Computer Engineering student, co-founder of Yugya, and builder of practical software for schools and small businesses in Nepal.',
    },
    journey: {
      title: 'Journey — Aayush Bhandari',
      description:
        'Verified milestones from the work: a loan ledger in production since 2023, a school platform running daily, technical leadership, and debug-first learning.',
    },
    projects: {
      title: 'Projects — AayusX',
      description:
        'Case studies and an archive of software by Aayush Bhandari: a school platform, a finance tool, a debug-first learning engine, and browser experiments.',
    },
    experiments: {
      title: 'Experiments — AayusX',
      description:
        'Interactive prototypes and studies by Aayush Bhandari: a physics playground, a terminal, gesture-controlled 3D, and a local-first AI assistant.',
    },
    capabilities: {
      title: 'Capabilities — AayusX',
      description:
        'What Aayush Bhandari can build: web products, desktop and systems tools, selective AI features, and the operations work that keeps products alive.',
    },
    writing: {
      title: 'Writing — AayusX',
      description:
        'Essays on constraints, maintenance, and shipping useful software, written from projects that actually reached production.',
    },
    contact: {
      title: 'Contact — Aayush Bhandari',
      description:
        'Join Aayush Bhandari’s community, collaborate on a project, or work with Yugya on hosting, infrastructure, and software.',
    },
    notFound: {
      title: 'Page not found — AayusX',
      description: 'This page does not exist. Return to the AayusX home page.',
    },
  },

  notFound: {
    eyebrow: '404',
    title: 'This page is not in the archive.',
    body: 'The link may be outdated, or the page may never have existed. The work is still here.',
    cta: 'Return home',
  },

  a11y: {
    mainLabel: 'Main content',
    introDialog: 'Cinematic introduction',
    menuDialog: 'Site menu',
    projectList: 'Project list',
    articleBody: 'Article',
    formStatus: 'Form status',
  },
};

export type Dictionary = typeof en;
