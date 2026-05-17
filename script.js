document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only enable custom cursor if device has a pointer
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for a smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, .project-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // Hero Slider
    const track = document.getElementById('sliderTrack');
    const thumbs = document.querySelectorAll('.thumb');
    
    if (track && thumbs.length) {
        let currentSlide = 0;
        const totalSlides = thumbs.length;
        const thumbsList = Array.from(thumbs);

        function goToSlide(index) {
            currentSlide = index;
            thumbsList.forEach(t => t.classList.remove('active'));
            thumbsList[index].classList.add('active');
            track.style.transform = `translateX(-${index * 25}%)`;
        }

        thumbsList.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => goToSlide(idx));
        });

        const prevBtn = document.getElementById('sliderPrev');
        const nextBtn = document.getElementById('sliderNext');

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(newIndex);
            });
        }
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentSlide + 1) % totalSlides;
                goToSlide(newIndex);
            });
        }
    }

    // Video Loop starting at 55s
    const screenerVideo = document.getElementById('screenerVideo');
    if (screenerVideo) {
        screenerVideo.addEventListener('ended', () => {
            screenerVideo.currentTime = 55;
            screenerVideo.play();
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            mobileToggle.innerHTML = '<i data-lucide="x"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            document.body.style.overflow = 'auto';
        }
        lucide.createIcons();
    }

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Active Menu Highlighting on Scroll
    const sections = document.querySelectorAll('section, footer');
    const navLinksArray = document.querySelectorAll('.nav-link');
    const mobileNavLinksArray = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Add offset so it highlights before hitting the absolute top
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Group 'about' section under 'intro' link
        if (current === 'about') {
            current = 'intro';
        }

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        mobileNavLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Trigger animations for elements initially in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
