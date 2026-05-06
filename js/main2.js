/* =============================================
   MAIN SCRIPT - Ibaad Contracting Inc
   Optimized for Responsiveness & Performance
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ================== HERO SLIDESHOW ================== */
    const slides = document.querySelectorAll('.hero-slide');
    let current = 0;

    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    /* ================== SCROLL PROGRESS BAR ================== */
    const progressBar = document.getElementById('progress');
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollable) * 100;
        progressBar.style.width = `${scrolled}%`;
    }, { passive: true });

    /* ================== NAVIGATION ================== */
    const nav = document.querySelector('nav');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Toggle mobile menu
    function toggleMenu() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    /* ================== HERO CANVAS (Performance Optimized) ================== */
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, nodes = [];
        let mX = -999, mY = -999;
        let animationFrame;
        let isMobile = window.innerWidth < 768;

        function resizeCanvas() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            isMobile = window.innerWidth < 768;
        }

        function initNodes() {
            nodes = [];
            const spacing = isMobile ? 110 : 90;   // Bigger spacing on mobile
            const cols = Math.floor(W / spacing) + 1;
            const rows = Math.floor(H / spacing) + 1;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    nodes.push({
                        ox: c * spacing + spacing / 2,
                        oy: r * spacing + spacing / 2,
                        x: c * spacing + spacing / 2,
                        y: r * spacing + spacing / 2,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        }

        function drawCanvas() {
            ctx.clearRect(0, 0, W, H);
            const t = Date.now() * 0.0005;

            // Update nodes
            nodes.forEach(n => {
                const dx = n.x - mX;
                const dy = n.y - mY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180 && dist > 0) {
                    const force = (180 - dist) / 180 * (isMobile ? 12 : 18);
                    n.vx += (dx / dist) * force;
                    n.vy += (dy / dist) * force;
                }

                n.vx += (n.ox - n.x) * 0.04;
                n.vy += (n.oy - n.y) * 0.04;
                n.vx *= 0.82;
                n.vy *= 0.82;
                n.x += n.vx;
                n.y += n.vy;

                // Gentle breathing animation
                n.x += Math.sin(t * 0.7 + n.oy * 0.012) * 0.3;
                n.y += Math.cos(t * 0.9 + n.ox * 0.01) * 0.3;
            });

            // Draw connections and dots
            nodes.forEach((n, i) => {
                // Connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const m = nodes[j];
                    const dx = n.x - m.x;
                    const dy = n.y - m.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(m.x, m.y);
                        const alpha = (1 - d / 110) * (isMobile ? 0.06 : 0.12);
                        ctx.strokeStyle = `rgba(255,116,48,${alpha})`;
                        ctx.lineWidth = isMobile ? 0.5 : 0.6;
                        ctx.stroke();
                    }
                }

                // Dots
                const distM = Math.sqrt((n.x - mX) ** 2 + (n.y - mY) ** 2);
                const glow = Math.max(0, 1 - distM / 200) * 0.5;

                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
                ctx.fillStyle = glow > 0.3 
                    ? `rgba(0,200,150,${0.15 + glow * 0.35})` 
                    : `rgba(255,116,48,${0.12 + glow * 0.3})`;
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(drawCanvas);
        }

        // Initialize
        function startCanvas() {
            resizeCanvas();
            initNodes();
            drawCanvas();
        }

        // Only run canvas on larger screens for performance
        if (!isMobile) {
            startCanvas();
            window.addEventListener('resize', () => {
                cancelAnimationFrame(animationFrame);
                setTimeout(startCanvas, 100);
            });
        } else {
            // Optional: Still show canvas but very light
            canvas.style.opacity = "0.15";
        }

        // Mouse tracking
        document.addEventListener('mousemove', e => {
            mX = e.clientX;
            mY = e.clientY;
        });
    }

    /* ================== REVEAL ANIMATIONS ================== */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in');
                }, entry.target.dataset.delay || 0);
            }
        });
    }, { threshold: 0.08 });

    reveals.forEach(el => {
        el.dataset.delay = 0;
        observer.observe(el);
    });

    /* ================== STAGGER ANIMATIONS ================== */
    function staggerGrid(selector, delay = 70) {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.style.transitionDelay = `${i * delay}ms`;
        });
    }

    staggerGrid('.met-grid .mc', 90);
    staggerGrid('.svc-grid .svc-card', 60);
    staggerGrid('.test-grid .test-card', 90);

    /* ================== PROCESS TIMELINE ================== */
    const procLine = document.getElementById('procLine');
    if (procLine) {
        const procObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                procLine.style.width = '85%';
            }
        }, { threshold: 0.4 });

        const processSection = document.querySelector('.process');
        if (processSection) procObserver.observe(processSection);
    }

    /* ================== PARALLAX GLOW ================== */
    const heroGlowB = document.querySelector('.hero-glow-b');
    const heroGlowG = document.querySelector('.hero-glow-g');

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (heroGlowB) heroGlowB.style.transform = `translateY(${sy * 0.25}px)`;
        if (heroGlowG) heroGlowG.style.transform = `translateY(${sy * 0.18}px)`;
    }, { passive: true });

});