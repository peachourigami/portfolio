// Funzione per entrare nel old
function enterPortfolio() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('portfolioPage').classList.add('active');

    setTimeout(() => {
        animateCards();
    }, 100);
}

// Funzione per tornare alla landing
function backToLanding() {
    document.getElementById('portfolioPage').classList.remove('active');
    document.getElementById('landingPage').style.display = 'flex';
}

// Animazione delle tessere polaroid
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

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cardsContainer');

    // Smooth scrolling migliorato
    cardsContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        cardsContainer.scrollTop += e.deltaY * 0.8;
    });

    // Navigation dots
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Effetti polaroid al hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05) translateY(-10px)';
            this.style.zIndex = '100';
        });

        card.addEventListener('mouseleave', function() {
            const isEven = Array.from(projectCards).indexOf(this) % 2 === 0;
            const rotation = isEven ? '-1deg' : '1deg';
            this.style.transform = `translateY(0) rotate(${rotation}) scale(1)`;
            this.style.zIndex = '1';
        });
    });

    // Parallax leggero per la scritta di sfondo
    cardsContainer.addEventListener('scroll', function() {
        const scrollTop = cardsContainer.scrollTop;
        const bg = document.querySelector('.old-background');
        bg.style.transform = `translate(-50%, -50%) translateY(${scrollTop * 0.1}px)`;
    });

    // Observer per animazioni al scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Gestione responsive
function handleResize() {
    const cards = document.querySelectorAll('.project-card');
    if (window.innerWidth <= 768) {
        cards.forEach(card => {
            card.style.transform = 'rotate(0deg)';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize();
