// This file is loaded as type="module": it is deferred automatically and
// its top level is module scope, so nothing here leaks onto window.
// DOM lookups are null-guarded so a markup change cannot take out every
// feature below it.

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Single source of truth for menu state, so the visual state and the
// state announced to assistive tech can never drift apart.
function setMenuOpen(isOpen) {
    if (!hamburger || !navMenu) return;
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

hamburger?.addEventListener('click', () => {
    setMenuOpen(!navMenu?.classList.contains('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        setMenuOpen(false);
    });
});

// Escape closes the menu and returns focus to the toggle, so keyboard
// users are never stranded inside a closed menu.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        setMenuOpen(false);
        hamburger?.focus();
    }
});

// Smooth scrolling is handled entirely in CSS: html { scroll-behavior:
// smooth } plus scroll-padding-top to clear the fixed navbar. The JS
// implementation that used to live here was a duplicate of that, and it
// called preventDefault(), which suppressed the browser's native focus
// move to the target section.

// Navbar shadow and scroll-to-top visibility share one scroll listener,
// registered at the end of this file once both elements exist.

// Animate skill bars when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0%';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Animate elements on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in animation to project cards and skill cards
document.querySelectorAll('.project-card, .skill-card').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    element.style.transitionDelay = `${index * 0.1}s`;
    fadeObserver.observe(element);
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button to prevent multiple submissions
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Send to Formspree
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = '#2ecc71';
            contactForm.reset();
        } else {
            // Error
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
        formStatus.textContent = 'Error sending message. Please try again.';
        formStatus.style.color = '#e74c3c';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Clear status message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    }
});

// Notification function
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    // role=status gives an implicit aria-live=polite, so the toast is
    // announced instead of appearing silently.
    notification.setAttribute('role', 'status');
    notification.textContent = message;

    // Appearance lives in style.css: .notification plus the
    // .notification-success / -error / -info modifiers.
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('is-leaving');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll-spy: highlight the nav link for the section currently on screen.
// Uses IntersectionObserver rather than a scroll handler - the previous
// implementation ran querySelectorAll twice and read offsetTop and
// clientHeight on every scroll event, forcing layout each tick.
const spySections = document.querySelectorAll('section[id]');
const navLinksById = new Map();
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    navLinksById.set(link.getAttribute('href').slice(1), link);
});

if (spySections.length && navLinksById.size) {
    const visible = new Set();

    const setActiveLink = () => {
        // With several sections on screen, pick the one nearest the top.
        let best = null;
        let bestTop = Infinity;
        visible.forEach(section => {
            const top = Math.abs(section.getBoundingClientRect().top);
            if (top < bestTop) {
                bestTop = top;
                best = section;
            }
        });

        navLinksById.forEach(link => link.classList.remove('active'));
        if (best) navLinksById.get(best.id)?.classList.add('active');
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visible.add(entry.target);
            } else {
                visible.delete(entry.target);
            }
        });
        setActiveLink();
    }, {
        // Bias the viewport upward so the section under the navbar wins.
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
    });

    spySections.forEach(section => spyObserver.observe(section));
}

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.type = 'button';
scrollToTopBtn.innerHTML = '<i aria-hidden="true" class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.className = 'scroll-to-top';

// Appearance lives in style.css: .scroll-to-top, with .is-visible
// controlling whether it shows and :hover handling the lift.
// Visibility is toggled by the shared scroll listener above.
document.body.appendChild(scrollToTopBtn);

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover lift is handled by .scroll-to-top:hover in style.css.

// Everything that reacts to scroll position shares one passive listener,
// throttled to a single run per animation frame. Previously the navbar
// shadow and this button each had their own unthrottled listener.
// Scroll-spy is deliberately absent: it runs on IntersectionObserver and
// needs no scroll events at all.
const navbarEl = document.querySelector('.navbar');
let scrollFrame = 0;

function onScrollFrame() {
    scrollFrame = 0;
    const y = window.scrollY;
    navbarEl?.classList.toggle('is-scrolled', y > 50);
    scrollToTopBtn.classList.toggle('is-visible', y > 300);
}

window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(onScrollFrame);
}, { passive: true });
