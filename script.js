// Animazione "polaroid" in ingresso
function animateCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) rotate(-3deg)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                if (index % 2 === 0) {
                    card.style.transform = 'translateY(0) rotate(-1deg)';
                } else {
                    card.style.transform = 'translateY(0) rotate(1deg)';
                }
            }, 50);
        }, index * 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Se siamo nella pagina portfolio
    const cardsContainer = document.getElementById('cardsContainer');
    const projectCards = document.querySelectorAll('.project-card');
    const navDots = document.querySelectorAll('.nav-dot');
    const bg = document.querySelector('.portfolio-background');

    if (cardsContainer) {
        // Smooth scroll su contenitore
        cardsContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            cardsContainer.scrollTop += e.deltaY * 0.8;
        }, { passive: false });

        // Dots attivi (demo visuale)
        navDots.forEach(dot => {
            dot.addEventListener('click', function () {
                navDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Hover polaroid
        projectCards.forEach((card, idx, list) => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'rotate(0deg) scale(1.05) translateY(-10px)';
                this.style.zIndex = '100';
            });
            card.addEventListener('mouseleave', function () {
                const isEven = Array.from(list).indexOf(this) % 2 === 0;
                const rotation = isEven ? '-1deg' : '1deg';
                this.style.transform = `translateY(0) rotate(${rotation}) scale(1)`;
                this.style.zIndex = '1';
            });
        });

        // Parallax scritta di sfondo
        if (bg) {
            cardsContainer.addEventListener('scroll', () => {
                const scrollTop = cardsContainer.scrollTop;
                bg.style.transform = `translate(-50%, -50%) translateY(${scrollTop * 0.1}px)`;
            });
        }

        // Observer per reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.2 });

        projectCards.forEach(card => observer.observe(card));

        // Avvio animazioni iniziali
        animateCards();
    }
});

// Fix rotazioni su mobile
function handleResize() {
    const cards = document.querySelectorAll('.project-card');
    if (window.innerWidth <= 768) {
        cards.forEach(card => { card.style.transform = 'rotate(0deg)'; });
    }
}
window.addEventListener('resize', handleResize);
handleResize();
