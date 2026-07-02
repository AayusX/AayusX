// Three.js Scene Setup
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Groups for different sections
const mainGroup = new THREE.Group();
scene.add(mainGroup);

// Particle System (Improved)
const particleCount = 1500;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 25;
    positions[i3 + 1] = (Math.random() - 0.5) * 25;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    // Soft light-theme palette: blue to violet
    const mixedColor = new THREE.Color();
    mixedColor.setHSL(0.58 + Math.random() * 0.1, 0.45, 0.6);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    sizes[i] = Math.random() * 0.1 + 0.02;
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

// Floating Torus for "Cinematic" look
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.08 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.z = -20;
mainGroup.add(torus);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Cinematic Scroll Animation
gsap.to(mainGroup.rotation, {
    x: Math.PI * 2,
    z: Math.PI,
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
    }
});

gsap.to(camera.position, {
    z: 2,
    y: 1,
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
    }
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotation
    particles.rotation.y = elapsedTime * 0.05;
    torus.rotation.x = elapsedTime * 0.1;
    torus.rotation.y = elapsedTime * 0.15;

    // Mouse follow
    mainGroup.position.x += (mouseX * 2 - mainGroup.position.x) * 0.05;
    mainGroup.position.y += (-mouseY * 2 - mainGroup.position.y) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Parallax for Background Elements
gsap.to(".about-image", {
    y: -50,
    scrollTrigger: {
        trigger: ".about-grid",
        scrub: true
    }
});

// Project Filtering Logic
function renderProjects(filter = 'all') {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || typeof projects === 'undefined') return;

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    projectsContainer.innerHTML = filteredProjects.map((project, index) => `
        <div class="glass-card project-card fade-in-up" style="--delay: ${index * 0.1}s">
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

    // Re-trigger scroll animations for projects
    gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
        }
    });
}

// Initial Call
renderProjects();

// Filter button click handlers
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Reveal Animations with GSAP
const fadeUps = document.querySelectorAll('.fade-in-up');
fadeUps.forEach(el => {
    gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Navbar active state and background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const petGuideMessage = document.getElementById('petGuideMessage');
const petGuideBubble = document.getElementById('petGuideBubble');
const petGuideWrapper = document.querySelector('.pet-guide-wrapper');
const cursorDot = document.getElementById('customCursorDot');
const cursorRing = document.getElementById('customCursorRing');
const guideMessages = [
    'Hello! Please scroll to explore my most exciting projects and skills.',
    'I design polished websites, intelligent AI systems, and responsive client experiences.',
    'Need inspiration? Explore the project section to see what I can build for you.',
];
let currentGuideIndex = 0;
let targetPetX = window.innerWidth - 160;
let targetPetY = window.innerHeight - 160;
let currentPetX = targetPetX;
let currentPetY = targetPetY;
let fadeTimeout = null;
let lastSection = null;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let ringX = cursorX;
let ringY = cursorY;

function updateGuideMessage(index, immediate = false) {
    if (!petGuideMessage) return;
    const nextIndex = index % guideMessages.length;
    if (nextIndex === currentGuideIndex && !immediate) return;
    currentGuideIndex = nextIndex;
    petGuideMessage.style.opacity = '0';
    clearTimeout(fadeTimeout);
    setTimeout(() => {
        petGuideMessage.textContent = guideMessages[currentGuideIndex];
        petGuideMessage.style.opacity = '1';
        fadeTimeout = setTimeout(() => {
            petGuideMessage.style.opacity = '0';
        }, 5000);
    }, 100);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function animatePet() {
    if (!petGuideWrapper) return;
    currentPetX = lerp(currentPetX, targetPetX, 0.18);
    currentPetY = lerp(currentPetY, targetPetY, 0.18);
    petGuideWrapper.style.transform = `translate3d(${currentPetX}px, ${currentPetY}px, 0)`;
    requestAnimationFrame(animatePet);
}

function animateCursor() {
    if (!cursorDot || !cursorRing) return;
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    ringX = lerp(ringX, cursorX, 0.18);
    ringY = lerp(ringY, cursorY, 0.18);
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animateCursor);
}

petGuideBubble?.addEventListener('click', () => {
    updateGuideMessage(currentGuideIndex + 1, true);
});

const sections = [
    { id: 'hero', messageIndex: 0 },
    { id: 'highlights', messageIndex: 1 },
    { id: 'skills', messageIndex: 1 },
    { id: 'projects', messageIndex: 2 },
    { id: 'services', messageIndex: 2 },
    { id: 'journey', messageIndex: 1 },
    { id: 'gallery', messageIndex: 1 },
    { id: 'contact', messageIndex: 2 },
];

function getCurrentSection() {
    let found = null;
    const scrollY = window.scrollY + window.innerHeight / 2;
    sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollY >= top && scrollY < bottom) {
            found = section;
        }
    });
    return found;
}

window.addEventListener('scroll', () => {
    const section = getCurrentSection();
    if (!section) return;
    if (lastSection !== section.id) {
        lastSection = section.id;
        updateGuideMessage(section.messageIndex, true);
    }
});

window.addEventListener('mousemove', (event) => {
    if (window.innerWidth <= 768 || !petGuideWrapper) return;
    targetPetX = event.clientX + 28;
    targetPetY = event.clientY + 28;
    cursorX = event.clientX;
    cursorY = event.clientY;
});

window.addEventListener('mouseover', (event) => {
    const hoverTarget = event.target.closest('a, button, .project-card, .nav-links a');
    if (hoverTarget) {
        document.body.classList.add('custom-cursor-hover');
    }
});

window.addEventListener('mouseout', (event) => {
    const leaveTarget = event.target.closest('a, button, .project-card, .nav-links a');
    if (leaveTarget) {
        document.body.classList.remove('custom-cursor-hover');
    }
});

window.addEventListener('resize', () => {
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
});

if (window.innerWidth > 768 && petGuideWrapper) {
    petGuideWrapper.style.left = '0';
    petGuideWrapper.style.top = '0';
    petGuideWrapper.style.right = 'auto';
    petGuideWrapper.style.bottom = 'auto';
    animatePet();
    animateCursor();
    updateGuideMessage(0, true);
}

console.log('✨ Cinematic Portfolio Initialized');
