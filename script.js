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

    // Cinematic palette: Teal, Blue, Purple (or keep earthy if preferred, but let's go cinematic)
    const mixedColor = new THREE.Color();
    mixedColor.setHSL(Math.random() * 0.1 + 0.45, 0.7, 0.5); // Teal/Cyan range

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
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
mainGroup.add(particles);

// Floating Torus for "Cinematic" look
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.1 });
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

console.log('✨ Cinematic Portfolio Initialized');
