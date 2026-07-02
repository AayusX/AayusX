/* ============================================================
   CINEMATIC PORTFOLIO — MAIN SCRIPT
   Three.js background, GSAP scroll animation, project filtering,
   custom cursor, and an AI-style floating guide.
   ============================================================ */

/* ---------------------------------------------------------
   1. THREE.JS SCENE SETUP
--------------------------------------------------------- */
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

gsap.registerPlugin(ScrollTrigger);

const mainGroup = new THREE.Group();
scene.add(mainGroup);

/* ---------------------------------------------------------
   2. PARTICLE SYSTEM
--------------------------------------------------------- */
const PARTICLE_COUNT = 1500;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 25;
    positions[i3 + 1] = (Math.random() - 0.5) * 25;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    const mixedColor = new THREE.Color();
    mixedColor.setHSL(0.58 + Math.random() * 0.1, 0.45, 0.6);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
mainGroup.add(particles);

/* ---------------------------------------------------------
   3. FLOATING TORUS (cinematic wireframe accent)
--------------------------------------------------------- */
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563eb,
    wireframe: true,
    transparent: true,
    opacity: 0.08
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.z = -20;
mainGroup.add(torus);

/* ---------------------------------------------------------
   4. MOUSE PARALLAX FOR 3D SCENE
--------------------------------------------------------- */
let sceneMouseX = 0;
let sceneMouseY = 0;

document.addEventListener('mousemove', (e) => {
    sceneMouseX = (e.clientX / window.innerWidth) - 0.5;
    sceneMouseY = (e.clientY / window.innerHeight) - 0.5;
});

/* ---------------------------------------------------------
   5. SCROLL-DRIVEN CAMERA / GROUP ANIMATION
--------------------------------------------------------- */
gsap.to(mainGroup.rotation, {
    x: Math.PI * 2,
    z: Math.PI,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
    }
});

gsap.to(camera.position, {
    z: 2,
    y: 1,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
    }
});

/* ---------------------------------------------------------
   6. MAIN RENDER LOOP
--------------------------------------------------------- */
const clock = new THREE.Clock();

function animateScene() {
    const elapsedTime = clock.getElapsedTime();

    particles.rotation.y = elapsedTime * 0.05;
    torus.rotation.x = elapsedTime * 0.1;
    torus.rotation.y = elapsedTime * 0.15;

    mainGroup.position.x += (sceneMouseX * 2 - mainGroup.position.x) * 0.05;
    mainGroup.position.y += (-sceneMouseY * 2 - mainGroup.position.y) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animateScene);
}
animateScene();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ---------------------------------------------------------
   7. PARALLAX FOR ABOUT SECTION IMAGE
--------------------------------------------------------- */
gsap.to('.about-image', {
    y: -50,
    scrollTrigger: {
        trigger: '.about-grid',
        scrub: true
    }
});

/* ---------------------------------------------------------
   8. PROJECT FILTERING
--------------------------------------------------------- */
function renderProjects(filter = 'all') {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || typeof projects === 'undefined') return;

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    projectsContainer.innerHTML = filteredProjects.map((project, index) => `
        <div class="glass-card project-card" style="--delay: ${index * 0.1}s">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');

}

renderProjects();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

/* ---------------------------------------------------------
   9. GENERIC REVEAL ANIMATIONS
--------------------------------------------------------- */
document.querySelectorAll('.fade-in-up').forEach(el => {
    gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

/* ---------------------------------------------------------
   10. NAVBAR SCROLL STATE
--------------------------------------------------------- */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------------------------------------------------------
   11. MOBILE MENU TOGGLE
--------------------------------------------------------- */
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/* ---------------------------------------------------------
   12. SMOOTH SCROLL FOR ANCHOR LINKS
--------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

/* ============================================================
   13. AI-STYLE FLOATING GUIDE
   Time-aware greetings, section-aware tips, idle behavior,
   scroll-stop detection, first-visit welcome, contact thank-you.
   ============================================================ */

const petGuideMessage = document.getElementById('petGuideMessage');
const petGuideBubble = document.getElementById('petGuideBubble');
const petGuideWrapper = document.querySelector('.pet-guide-wrapper');
const cursorDot = document.getElementById('customCursorDot');
const cursorRing = document.getElementById('customCursorRing');

/* ---- Message bank, grouped by intent ---- */
const GUIDE_MESSAGES = {
    greetingMorning: [
        "Good morning! Thanks for stopping by — feel free to look around.",
        "Morning! I'll point out the good stuff as you scroll.",
        "Good morning — grab a coffee and let's explore this portfolio together."
    ],
    greetingAfternoon: [
        "Good afternoon! Glad you're here — let me show you around.",
        "Afternoon! Scroll down whenever you're ready, I'll keep you company.",
        "Good afternoon — there's some interesting work coming up below."
    ],
    greetingEvening: [
        "Good evening! Thanks for visiting at this hour — let's dive in.",
        "Evening! I'll guide you through the highlights as you go.",
        "Good evening — settle in, there's a lot to see here."
    ],
    firstVisit: [
        "Welcome! First time here? I'll help you find your way around.",
        "Hi there — welcome to the portfolio. Scroll down to get started.",
        "Welcome aboard! I'm your guide for this page, just keep scrolling."
    ],
    returningVisit: [
        "Welcome back! Anything new catch your eye last time?",
        "Good to see you again — feel free to jump straight to what you need.",
        "Welcome back! Let me know if you'd like a quick refresher tour."
    ],
    hero: [
        "This is the introduction — scroll down to see highlights and skills.",
        "Take a moment here, then keep scrolling for the full story.",
        "Hi! Scroll down whenever you're ready to explore."
    ],
    highlights: [
        "Here's a quick snapshot of what I do best.",
        "These highlights sum up my core strengths at a glance.",
        "A few key numbers and achievements worth a look."
    ],
    skills: [
        "This section covers the tools and technologies I work with.",
        "Take a look at my technical toolkit here.",
        "Here's what's under the hood — languages, frameworks, and tools."
    ],
    projects: [
        "Here are some of my favorite projects — try the filters above.",
        "Explore the project section to see what I can build for you.",
        "Use the category filters to browse projects by type."
    ],
    services: [
        "Here's how I can help — take a look at the services offered.",
        "This section covers what I can do for your next project.",
        "Curious what I offer? This is the place to check."
    ],
    journey: [
        "This is my journey so far — a timeline of experience and growth.",
        "Here's a look at the path that got me here.",
        "A quick timeline of milestones along the way."
    ],
    gallery: [
        "A visual look at some of the work behind the scenes.",
        "Here's a gallery with a closer look at the details.",
        "Take a moment to browse through the visuals here."
    ],
    contact: [
        "Thanks for making it all the way down here! Let's talk — send a message anytime.",
        "You've reached the end — I'd love to hear from you. Feel free to reach out!",
        "Thanks for scrolling through — the contact form below is the fastest way to reach me."
    ],
    idle: [
        "Take your time — I'm here if you need anything.",
        "Feel free to scroll at your own pace.",
        "Still exploring? Let me know if something catches your interest.",
        "No rush — there's plenty to see."
    ],
    scrollPause: [
        "Found something interesting? Feel free to linger here.",
        "Take a closer look — there's more detail if you keep reading.",
        "Pausing here? Good choice, this part's worth a closer look."
    ]
};

/* ---- State ---- */
let currentMessagePool = [];
let currentMessageIndex = 0;
let messageFadeTimeout = null;
let messageRotationInterval = null;
let lastSectionId = null;
let scrollStopTimer = null;
let idleTimer = null;
let hasGreeted = false;
const IS_RETURNING_VISITOR = (() => {
    try {
        const seen = localStorage.getItem('portfolioVisited');
        localStorage.setItem('portfolioVisited', 'true');
        return !!seen;
    } catch (err) {
        return false;
    }
})();

/* ---- Helpers ---- */
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getTimeBasedGreetingPool() {
    const hour = new Date().getHours();
    if (hour < 12) return GUIDE_MESSAGES.greetingMorning;
    if (hour < 18) return GUIDE_MESSAGES.greetingAfternoon;
    return GUIDE_MESSAGES.greetingEvening;
}

function showGuideMessage(text) {
    if (!petGuideMessage) return;
    petGuideMessage.style.opacity = '0';
    clearTimeout(messageFadeTimeout);
    setTimeout(() => {
        petGuideMessage.textContent = text;
        petGuideMessage.style.opacity = '1';
        messageFadeTimeout = setTimeout(() => {
            petGuideMessage.style.opacity = '0';
        }, 5500);
    }, 150);
}

function setMessagePool(pool) {
    if (!pool || !pool.length) return;
    currentMessagePool = pool;
    currentMessageIndex = 0;
    showGuideMessage(pool[0]);
    resetIdleTimer();
}

function advanceMessagePool() {
    if (!currentMessagePool.length) return;
    currentMessageIndex = (currentMessageIndex + 1) % currentMessagePool.length;
    showGuideMessage(currentMessagePool[currentMessageIndex]);
    resetIdleTimer();
}

/* ---- Idle behavior: subtle nudge if the visitor stops interacting ---- */
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        showGuideMessage(pickRandom(GUIDE_MESSAGES.idle));
    }, 18000);
}

/* ---- Section detection ---- */
const SECTION_IDS = ['hero', 'highlights', 'skills', 'projects', 'services', 'journey', 'gallery', 'contact'];

function getCurrentSectionId() {
    let found = null;
    const scrollMid = window.scrollY + window.innerHeight / 2;
    SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (scrollMid >= top && scrollMid < bottom) found = id;
    });
    return found;
}

function handleSectionChange() {
    const sectionId = getCurrentSectionId();
    if (!sectionId || sectionId === lastSectionId) return;
    lastSectionId = sectionId;

    const pool = GUIDE_MESSAGES[sectionId];
    if (pool) setMessagePool(pool);
}

/* ---- Scroll-stop detection: offer a tip once scrolling settles ---- */
function handleScrollStopDetection() {
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
        // Only chime in occasionally, and not right on top of a section change
        if (Math.random() < 0.35) {
            showGuideMessage(pickRandom(GUIDE_MESSAGES.scrollPause));
            resetIdleTimer();
        }
    }, 2200);
}

window.addEventListener('scroll', () => {
    handleSectionChange();
    handleScrollStopDetection();
}, { passive: true });

/* ---- Initial greeting ---- */
function initialGreeting() {
    if (hasGreeted) return;
    hasGreeted = true;

    const timePool = getTimeBasedGreetingPool();
    const visitorPool = IS_RETURNING_VISITOR ? GUIDE_MESSAGES.returningVisit : GUIDE_MESSAGES.firstVisit;

    // Lead with a time-aware greeting, then follow with a visitor-aware note
    showGuideMessage(pickRandom(timePool));
    setTimeout(() => {
        setMessagePool(visitorPool);
    }, 5000);
}

/* ---- Manual advance on click ---- */
petGuideBubble?.addEventListener('click', () => {
    if (currentMessagePool.length) {
        advanceMessagePool();
    } else {
        showGuideMessage(pickRandom(GUIDE_MESSAGES.idle));
        resetIdleTimer();
    }
});

/* ---------------------------------------------------------
   14. FLOATING GUIDE MOVEMENT (follows cursor with easing)
--------------------------------------------------------- */
let targetPetX = window.innerWidth - 160;
let targetPetY = window.innerHeight - 160;
let currentPetX = targetPetX;
let currentPetY = targetPetY;

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function animateGuide() {
    if (!petGuideWrapper) return;
    currentPetX = lerp(currentPetX, targetPetX, 0.18);
    currentPetY = lerp(currentPetY, targetPetY, 0.18);
    petGuideWrapper.style.transform = `translate3d(${currentPetX}px, ${currentPetY}px, 0)`;
    requestAnimationFrame(animateGuide);
}

/* ---------------------------------------------------------
   15. CUSTOM CURSOR
--------------------------------------------------------- */
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let ringX = cursorX;
let ringY = cursorY;

function animateCursor() {
    if (!cursorDot || !cursorRing) return;
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    ringX = lerp(ringX, cursorX, 0.18);
    ringY = lerp(ringY, cursorY, 0.18);
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animateCursor);
}

window.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    if (window.innerWidth > 768 && petGuideWrapper) {
        targetPetX = event.clientX + 28;
        targetPetY = event.clientY + 28;
    }
});

window.addEventListener('mouseover', (event) => {
    const hoverTarget = event.target.closest('a, button, .project-card, .nav-links a');
    if (hoverTarget) document.body.classList.add('custom-cursor-hover');
});

window.addEventListener('mouseout', (event) => {
    const leaveTarget = event.target.closest('a, button, .project-card, .nav-links a');
    if (leaveTarget) document.body.classList.remove('custom-cursor-hover');
});

/* ---------------------------------------------------------
   16. RESPONSIVE REPOSITIONING FOR THE GUIDE
--------------------------------------------------------- */
function repositionGuideForViewport() {
    if (!petGuideWrapper) return;
    if (window.innerWidth <= 768) {
        petGuideWrapper.style.left = 'auto';
        petGuideWrapper.style.right = '2rem';
        petGuideWrapper.style.top = 'auto';
        petGuideWrapper.style.bottom = '2rem';
        petGuideWrapper.style.transform = 'none';
    } else {
        petGuideWrapper.style.left = '0';
        petGuideWrapper.style.top = '0';
        petGuideWrapper.style.right = 'auto';
        petGuideWrapper.style.bottom = 'auto';
    }
}

window.addEventListener('resize', repositionGuideForViewport);

/* ---------------------------------------------------------
   17. INIT GUIDE + CURSOR (desktop only)
--------------------------------------------------------- */
if (window.innerWidth > 768 && petGuideWrapper) {
    repositionGuideForViewport();
    animateGuide();
    animateCursor();
    initialGreeting();
    resetIdleTimer();
}

console.log('✨ Cinematic Portfolio Initialized');