document.addEventListener('DOMContentLoaded', () => {
    /* ================== HAMBURGER MENU ================== */
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');

    function toggleMenu() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    if (toggle) toggle.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    /* ================== SCROLL PROGRESS ================== */
    const progressBar = document.getElementById('progress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progressBar.style.width = pct + '%';
    }, { passive: true });

    /* ================== NAV SCROLL EFFECT ================== */
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ================== REVEAL ON SCROLL ================== */
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .svc-category').forEach(el => obs.observe(el));

    /* ================== FILTER ================== */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            document.querySelectorAll('.svc-category').forEach(cat => {
                const cats = cat.dataset.category || '';
                if (filter === 'all' || cats.includes(filter)) {
                    cat.classList.remove('hidden');
                    setTimeout(() => cat.classList.add('visible'), 50);
                } else {
                    cat.classList.add('hidden');
                    cat.classList.remove('visible');
                }
            });
        });
    });

    /* ================== FILTER FOR GALLERY & PROJECTS ================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            filterItems.forEach(item => {
                if (filter === 'all' || item.dataset.category.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* ================== FAQ ================== */
    function toggleFaq(btn) {
        const item = btn.parentElement;
        item.classList.toggle('open');
    }

    // Expose to global scope for inline onclick handlers
    window.toggleFaq = toggleFaq;

    /* ================== DETAILS TOGGLE (Projects) ================== */
    window.toggleDetails = function(btn) {
        const details = btn.parentElement.nextElementSibling;
        details.classList.toggle('show');
    };
});