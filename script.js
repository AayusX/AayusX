// Three.js Scene Setup
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Particle System
const particleCount = 800;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Initialize particles with earthy colors
for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Earthy color palette: Forest Green and Sage Green
    const colorChoice = Math.random();
    if (colorChoice > 0.6) {
        // Forest Green #445D48
        colors[i] = 0.27;     // R
        colors[i + 1] = 0.36; // G
        colors[i + 2] = 0.28; // B
    } else if (colorChoice > 0.3) {
        // Sage Green #D6CC99
        colors[i] = 0.84;     // R
        colors[i + 1] = 0.8;  // G
        colors[i + 2] = 0.6;  // B
    } else {
        // Terracotta #5E3023
        colors[i] = 0.37;     // R
        colors[i + 1] = 0.19; // G
        colors[i + 2] = 0.14; // B
    }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Rotate particles based on mouse
    particles.rotation.x = targetY * 0.3;
    particles.rotation.y = targetX * 0.3;

    // Continuous rotation
    particles.rotation.z += 0.0005;

    // Wave effect on particles
    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.0005;

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x + time) * 0.5 + Math.cos(y + time) * 0.5;
    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
const navbar = document.querySelector('.glass-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsContainer = document.getElementById('projects-container');

// Render projects from projects.js with clickable links and eye icon
function renderProjects(filter = 'all') {
    if (typeof projects === 'undefined') {
        // Fallback if projects.js isn't loaded
        projectsContainer.innerHTML = `
            <a href="https://github.com/Aayushkin/FailFirst" target="_blank" rel="noopener noreferrer" class="glass-card project-card fade-in-up" style="text-decoration: none;">
                <div class="project-eye-icon"><i class="fas fa-eye"></i></div>
                <h3>FailFirst App</h3>
                <p>A gamified C++ learning platform with advanced animations and local persistence.</p>
                <div class="project-tags">
                    <span class="tag">C++</span>
                    <span class="tag">Raylib</span>
                    <span class="tag">Education</span>
                </div>
            </a>
            <a href="https://github.com/AayusX/AayushAI-Core" target="_blank" rel="noopener noreferrer" class="glass-card project-card fade-in-up" style="text-decoration: none;">
                <div class="project-eye-icon"><i class="fas fa-eye"></i></div>
                <h3>AayushAI Core</h3>
                <p>Advanced AI agent architecture capable of complex reasoning and task execution.</p>
                <div class="project-tags">
                    <span class="tag">Python</span>
                    <span class="tag">AI</span>
                    <span class="tag">LLMs</span>
                </div>
            </a>
            <a href="https://github.com/Aayushkin" target="_blank" rel="noopener noreferrer" class="glass-card project-card fade-in-up" style="text-decoration: none;">
                <div class="project-eye-icon"><i class="fas fa-eye"></i></div>
                <h3>Interactive Web Apps</h3>
                <p>Collection of 30+ interactive web applications showcasing modern JavaScript and CSS.</p>
                <div class="project-tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">CSS</span>
                    <span class="tag">HTML</span>
                </div>
            </a>
        `;
        return;
    }

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    projectsContainer.innerHTML = filteredProjects.slice(0, 12).map((project, index) => `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="glass-card project-card fade-in-up" style="--delay: ${index * 0.1}s; text-decoration: none; color: inherit; display: block;">
            <div class="project-eye-icon">👁</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `).join('');

    // Re-observe new elements
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });
}

// Initial render
renderProjects();

// Filter button click handlers
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Coder character parallax effect
const coderCharacter = document.getElementById('coder-character');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;

    if (coderCharacter) {
        const yPos = -(scrolled * parallaxSpeed);
        coderCharacter.style.transform = `translate(-50%, ${yPos}px)`;
    }
});

// Add stagger animation to skills
document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.style.setProperty('--delay', `${index * 0.15}s`);
});

// Add stagger to timeline items
document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.setProperty('--delay', `${index * 0.2}s`);
});

console.log('🚀 Portfolio initialized with Three.js interactive background');
