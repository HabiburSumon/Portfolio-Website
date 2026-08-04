/**
 * Portfolio Website - Habibur Sumon
 * Premium Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeaderScroll();
    initContactForm();
    initScrollAnimations();
    initSkillBars();
    initTypingEffect();
    initBackToTop();
    initMagneticButtons();
    initMouseParallax();
    initAnimatedCounters();
    initChatWidget();
    initSmoothScroll();
    initRevealAnimations();
    initHeroSlider();
});



/**
 * Mobile navigation menu toggle
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isActive);
        navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Header shadow on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function updateHeader() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const statusElement = document.getElementById('form-status');

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) errorElement.textContent = '';
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'name-error', 'Please enter your name.');
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, 'email-error', 'Please enter your email address.');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, 'email-error', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'message-error', 'Please enter your message.');
            isValid = false;
        }

        if (!isValid) {
            if (statusElement) {
                statusElement.textContent = 'Please fix the errors above.';
                statusElement.className = 'form-status error';
            }
            return;
        }

        // Simulate form submission (replace with actual form service like Formspree)
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        // Simulate async submission
        setTimeout(function() {
            if (statusElement) {
                statusElement.textContent = 'Thank you! Your message has been sent successfully.';
                statusElement.className = 'form-status success';
            }
            form.reset();
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }, 1500);
    });
}

/**
 * Display form field error
 */
function showError(input, errorId, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Scroll reveal animations using IntersectionObserver
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.highlight-card, .project-card, .skill-category, .education-card, .timeline-item, .project-detail'
    );

    if (!('IntersectionObserver' in window)) {
        return; // Fallback: elements remain visible
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Animate skill bars when they come into view
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    if (!skillBars.length) return;

    if (!('IntersectionObserver' in window)) {
        skillBars.forEach(function(bar) {
            bar.style.width = bar.style.width || '0%';
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                // Force reflow
                void bar.offsetWidth;
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/**
 * Typing effect for hero subtitle
 */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;


    const phrases = [
        'Software Engineer',
        'Flutter Developer',
        'Mobile App Developer',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        const currentText = currentPhrase.substring(0, charIndex);

        typingElement.textContent = currentText;

        if (!isDeleting) {
            charIndex++;
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    type();
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);

    function updateButton() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Magnetic hover buttons
 */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    if (!magneticButtons.length) return;

    magneticButtons.forEach(function(button) {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = 'translate(' + x * 0.3 + 'px, ' + y * 0.3 + 'px)';
        });

        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Mouse parallax effect
 */
function initMouseParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (!parallaxElements.length) return;

    document.addEventListener('mousemove', function(e) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxElements.forEach(function(element) {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
    });
}

/**
 * Animated counters
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-number');

    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
        counters.forEach(function(counter) {
            counter.textContent = counter.getAttribute('data-target') || counter.textContent;
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || 0;
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    const current = Math.round(target * eased);
                    counter.textContent = current + (counter.getAttribute('data-suffix') || '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

/**
 * AI Assistant Chat Widget
 */
function initChatWidget() {
    // Create chat widget HTML
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.setAttribute('role', 'dialog');
    chatWidget.setAttribute('aria-label', 'AI Assistant Chat');
    chatWidget.innerHTML = `
        <div class="chat-header">
            <div class="chat-avatar">🤖</div>
            <div class="chat-header-info">
                <h3>AI Assistant</h3>
                <p>How can I help you?</p>
            </div>
            <button class="chat-close" aria-label="Close chat">×</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="chat-message bot">Hi! I'm Habibur's AI assistant. Ask me about his skills, projects, or experience!</div>
        </div>
        <div class="chat-input-area">
            <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." aria-label="Chat message">
            <button class="chat-send" aria-label="Send message">➤</button>
        </div>
    `;

    // Create toggle button
    const chatToggle = document.createElement('button');
    chatToggle.className = 'chat-toggle';
    chatToggle.setAttribute('aria-label', 'Open AI assistant chat');
    chatToggle.innerHTML = '💬';
    chatToggle.setAttribute('aria-expanded', 'false');

    document.body.appendChild(chatWidget);
    document.body.appendChild(chatToggle);

    const messagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = chatWidget.querySelector('.chat-send');
    const chatClose = chatWidget.querySelector('.chat-close');

    // Toggle chat
    chatToggle.addEventListener('click', function() {
        const isOpen = chatWidget.classList.toggle('open');
        chatToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', function() {
        chatWidget.classList.remove('open');
        chatToggle.setAttribute('aria-expanded', 'false');
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = message;
        messagesContainer.appendChild(userMsg);

        chatInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate AI response
        setTimeout(function() {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            botMsg.textContent = getBotResponse(message);
            messagesContainer.appendChild(botMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

/**
 * Get bot response based on user input
 */
function getBotResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes('skill') || msg.includes('tech')) {
        return "Habibur specializes in Flutter, Kotlin, Android, Laravel, Firebase, and REST APIs. He's a full-stack developer with a focus on mobile apps!";
    }
    if (msg.includes('project') || msg.includes('work')) {
        return "His main projects include SwiftPay (a fintech mobile app) and a Firebase Push Notification System. Check out the Projects page for details!";
    }
    if (msg.includes('experience') || msg.includes('job')) {
        return "Habibur is currently a Software Engineer at Unisoft System Limited, where he develops mobile and web applications.";
    }
    if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
        return "You can reach Habibur through the Contact page or connect with him on LinkedIn at linkedin.com/in/habibur-sumon/";
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! 👋 I'm here to help you learn more about Habibur. Ask me about his skills, projects, or experience!";
    }
    if (msg.includes('education') || msg.includes('study')) {
        return "Habibur has a Bachelor of Science in Computer Science & Engineering, focusing on software development and mobile computing.";
    }
    if (msg.includes('resume') || msg.includes('cv')) {
        return "You can view or download Habibur's resume from the Resume page!";
    }
    if (msg.includes('thank')) {
        return "You're welcome! 😊 Feel free to ask me anything else about Habibur.";
    }

    return "That's a great question! For more details, I'd recommend checking out Habibur's About, Projects, or Resume pages. You can also contact him directly through the Contact page!";
}

/**
 * Smooth scrolling with Lenis-like behavior
 */
function initSmoothScroll() {
    // Custom smooth scroll implementation (Lenis-like)
    // Uses requestAnimationFrame for smooth scrolling
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Section reveal animations
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(function(element) {
            element.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * Hero Background Image Slider
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        // Remove active from all
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });

        // Set active
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Dot click handlers
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Start autoplay
    startAutoPlay();

    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoPlay);
        hero.addEventListener('mouseleave', startAutoPlay);
    }
}

