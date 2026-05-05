
        window.addEventListener('scroll', () => {
            const h = document.documentElement;
            const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
            document.getElementById('progress').style.width = pct + '%';
        });

        // Reveal on scroll
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal, .svc-category').forEach(el => obs.observe(el));

        // Filter
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

        // FAQ
        function toggleFaq(btn) {
            const item = btn.parentElement;
            item.classList.toggle('open');
        }
