// ===================================
// Main JavaScript Functionality
// ===================================

// Global state
const state = {
    isMenuOpen: false,
    currentSection: 'home',
    scrollPosition: 0,
    isScrolling: false
};

// ===================================
// DOM Content Loaded Event
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ===================================
// Initialize Application
// ===================================
function initializeApp() {
    // Setup navigation
    setupMobileMenu();
    setupSmoothScroll();
    setupActiveNavigation();
    
    // Setup scroll features
    setupScrollTopButton();
    setupScrollAnimations();
    
    // Setup sections
    setupHomeSection();
    setupAboutSection();
    setupSkillsSection();
    setupProjectsSection();
    setupContactForm();
    
    // Setup responsive features
    setupResponsiveHandling();
    
    // Initial animations
    triggerInitialAnimations();
    
    console.log('Portfolio initialized successfully!');
}

// ===================================
// Mobile Menu Navigation
// ===================================
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            state.isMenuOpen = !state.isMenuOpen;
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (state.isMenuOpen) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMenuOpen) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    state.isMenuOpen = false;
                    
                    const bars = hamburger.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (state.isMenuOpen && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                state.isMenuOpen = false;
                
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
}

// ===================================
// Smooth Scroll Navigation
// ===================================
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for home buttons
    const homeButtons = document.querySelectorAll('.btn');
    homeButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// ===================================
// Active Navigation Highlighting
// ===================================
function setupActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                state.currentSection = sectionId;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// Scroll to Top Button
// ===================================
function setupScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .achievement-card, .timeline-item, .education-card'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===================================
// Home Section Animations
// ===================================
function setupHomeSection() {
    // Typing animation for greeting
    const greetingText = document.querySelector('.greeting');
    if (greetingText) {
        animateTyping(greetingText, greetingText.textContent, 100);
    }
    
    // Particle background animation
    createParticles();
}

function animateTyping(element, text, speed) {
    element.textContent = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

function createParticles() {
    const particlesContainer = document.querySelector('.home-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--primary)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===================================
// About Section - Animated Counters
// ===================================
function setupAboutSection() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// Skills Section - Progress Bars
// ===================================
function setupSkillsSection() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// ===================================
// Projects Section - Modal Functionality
// ===================================
function setupProjectsSection() {
    const projectButtons = document.querySelectorAll('.view-details');
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');
    const modalClose = document.querySelector('.project-modal-close');
    
    // Project detailed data
    const projectDetails = {
        1: {
            title: 'OpenCV Augmentation System',
            badge: 'Hackathon Winner',
            date: 'March 2025',
            description: 'Award-winning project at Aura Hackathon featuring advanced OpenCV augmentation techniques combined with machine learning algorithms for real-time image processing and analysis.',
            details: [
                'Implemented real-time image augmentation using OpenCV',
                'Developed custom ML models for image classification',
                'Achieved 95% accuracy in testing phase',
                'Built user-friendly interface for non-technical users',
                'Optimized performance for real-time processing'
            ],
            technologies: ['OpenCV', 'Python', 'Machine Learning', 'NumPy', 'TensorFlow'],
            impact: 'Won first place at Aura Hackathon competing against 50+ teams',
            github: '#',
            demo: '#'
        },
        2: {
            title: 'NASA Earth Data Analysis Platform',
            badge: 'Space Technology',
            date: 'October 2025',
            description: 'Comprehensive web application integrating NASA\'s GIBS WMS service with Flask backend for cloud-based earth data visualization and analysis.',
            details: [
                'Integrated NASA GIBS API for satellite imagery',
                'Built Flask backend with RESTful API architecture',
                'Created interactive data visualization dashboard',
                'Implemented data caching for improved performance',
                'Added PDF export functionality for reports'
            ],
            technologies: ['Flask', 'NASA GIBS', 'JavaScript', 'HTML/CSS', 'Python'],
            impact: 'Participated in 2025 Space Apps Challenge, enabling researchers to analyze earth data efficiently',
            github: '#',
            demo: '#'
        },
        3: {
            title: 'SecureStep Fall Detection System',
            badge: 'IoT Solution',
            date: 'March 2025',
            description: 'IoT-based fall detection system using sensors and machine learning to monitor elderly individuals and send real-time alerts to caregivers.',
            details: [
                'Developed sensor fusion algorithm for accurate fall detection',
                'Implemented ML model to distinguish falls from normal activities',
                'Created mobile app for caregiver notifications',
                'Integrated GPS for location tracking',
                'Achieved 92% detection accuracy'
            ],
            technologies: ['IoT', 'Arduino', 'Machine Learning', 'Python', 'Mobile App'],
            impact: 'Healthcare solution for elderly monitoring with real-time alert system',
            github: '#',
            demo: '#'
        },
        4: {
            title: 'Multi-Purpose Object Detection',
            badge: 'Computer Vision',
            date: 'August 2025',
            description: 'Comprehensive detection system for oil spills, hand gestures, and general object recognition using advanced computer vision techniques.',
            details: [
                'Built multiple detection models for different use cases',
                'Implemented YOLO algorithm for real-time detection',
                'Created hand gesture recognition for touchless interfaces',
                'Developed oil spill detection for environmental monitoring',
                'Optimized models for edge device deployment'
            ],
            technologies: ['OpenCV', 'YOLO', 'Deep Learning', 'Python', 'TensorFlow'],
            impact: 'Multi-domain application serving environmental and interface needs',
            github: '#',
            demo: '#'
        },
        5: {
            title: 'Plant Identification & Disease Detection',
            badge: 'Agriculture AI',
            date: 'April 2025',
            description: 'AI-powered system for identifying plant species and detecting diseases through image analysis, helping farmers make informed decisions.',
            details: [
                'Trained CNN models on 50,000+ plant images',
                'Achieved 94% accuracy in disease detection',
                'Built mobile-friendly web interface',
                'Integrated treatment recommendations',
                'Added multilingual support for farmers'
            ],
            technologies: ['TensorFlow', 'CNN', 'Flask', 'Python', 'OpenCV'],
            impact: 'Agriculture solution helping farmers identify and treat plant diseases early',
            github: '#',
            demo: '#'
        },
        6: {
            title: 'Weather & Air Quality Forecasting',
            badge: 'Predictive Analytics',
            date: 'June 2025',
            description: 'Machine learning-based system for predicting weather patterns and air pollution levels using historical data and real-time API integration.',
            details: [
                'Implemented time series forecasting models',
                'Integrated multiple weather APIs',
                'Built interactive visualization dashboard',
                'Added location-based predictions',
                'Created alert system for air quality warnings'
            ],
            technologies: ['Machine Learning', 'Python', 'APIs', 'Data Analysis', 'Flask'],
            impact: 'Environmental monitoring tool providing accurate forecasts and health alerts',
            github: '#',
            demo: '#'
        }
    };
    
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                displayProjectModal(project);
            }
        });
    });
    
    function displayProjectModal(project) {
        const detailsList = project.details.map(detail => `<li>${detail}</li>`).join('');
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        modalBody.innerHTML = `
            <div class="project-modal-header">
                <span class="project-badge">${project.badge}</span>
                <h2>${project.title}</h2>
                <p class="project-date">${project.date}</p>
            </div>
            <div class="project-modal-description">
                <h3>Overview</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-modal-details">
                <h3>Key Features</h3>
                <ul>${detailsList}</ul>
            </div>
            <div class="project-modal-tech">
                <h3>Technologies Used</h3>
                <div class="tech-tags">${techTags}</div>
            </div>
            <div class="project-modal-impact">
                <h3>Impact</h3>
                <p>${project.impact}</p>
            </div>
            <div class="project-modal-links">
                <a href="${project.github}" class="btn btn-primary" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }
    
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Continue in next part...
// ===================================
// Contact Form Handling
// ===================================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (validateContactForm(formData)) {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully.');
                
                // Reset form
                contactForm.reset();
                
                // In production, send data to server
                console.log('Form data:', formData);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
}

function validateContactForm(formData) {
    let isValid = true;
    
    // Name validation
    if (formData.name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (formData.subject.length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Message validation
    if (formData.message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.getAttribute('id');
    
    // Remove existing error
    clearFieldError(fieldName);
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 3) {
                showFieldError(fieldName, 'Subject must be at least 3 characters long');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Add error class
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    field.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFormMessage(type, message) {
    const contactForm = document.getElementById('contactForm');
    
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '0.5rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.animation = 'fadeIn 0.3s ease';
    
    if (type === 'success') {
        messageDiv.style.background = '#d1fae5';
        messageDiv.style.color = '#065f46';
        messageDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else {
        messageDiv.style.background = '#fee2e2';
        messageDiv.style.color = '#991b1b';
        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// ===================================
// Responsive Handling
// ===================================
function setupResponsiveHandling() {
    let windowWidth = window.innerWidth;
    
    window.addEventListener('resize', debounce(() => {
        const newWidth = window.innerWidth;
        
        // Only execute if width actually changed (not just height on mobile)
        if (Math.abs(newWidth - windowWidth) > 50) {
            windowWidth = newWidth;
            handleResponsiveChanges();
        }
    }, 250));
}

function handleResponsiveChanges() {
    const width = window.innerWidth;
    
    // Mobile adjustments
    if (width <= 768) {
        adjustForMobile();
    } else if (width <= 1024) {
        adjustForTablet();
    } else {
        adjustForDesktop();
    }
}

function adjustForMobile() {
    // Mobile-specific adjustments
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.gridTemplateColumns = '1fr';
    }
}

function adjustForTablet() {
    // Tablet-specific adjustments
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.gridTemplateColumns = '1fr';
    }
}

function adjustForDesktop() {
    // Desktop-specific adjustments
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.gridTemplateColumns = '1fr 1fr';
    }
}

// ===================================
// Initial Animations
// ===================================
function triggerInitialAnimations() {
    // Animate header on load
    const header = document.querySelector('.header-container');
    if (header) {
        header.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            header.style.transition = 'transform 0.5s ease';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate home section elements
    const homeText = document.querySelector('.home-text');
    if (homeText) {
        homeText.style.opacity = '0';
        homeText.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            homeText.style.transition = 'all 0.8s ease';
            homeText.style.opacity = '1';
            homeText.style.transform = 'translateX(0)';
        }, 300);
    }
    
    const homeImage = document.querySelector('.home-image');
    if (homeImage) {
        homeImage.style.opacity = '0';
        homeImage.style.transform = 'translateX(50px)';
        setTimeout(() => {
            homeImage.style.transition = 'all 0.8s ease';
            homeImage.style.opacity = '1';
            homeImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 80) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

// ===================================
// Performance Monitoring
// ===================================
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('Performance Metrics:');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Connect Time: ${connectTime}ms`);
        console.log(`Render Time: ${renderTime}ms`);
    }
}

// Log performance metrics after page load
window.addEventListener('load', () => {
    setTimeout(logPerformanceMetrics, 0);
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC key - close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.voice-modal.active, .project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Arrow keys - scroll sections
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        scrollToNextSection();
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        scrollToPreviousSection();
    }
});

function scrollToNextSection() {
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentIndex = sections.findIndex(section => isInViewport(section));
    
    if (currentIndex < sections.length - 1) {
        smoothScrollTo(sections[currentIndex + 1]);
    }
}

function scrollToPreviousSection() {
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentIndex = sections.findIndex(section => isInViewport(section));
    
    if (currentIndex > 0) {
        smoothScrollTo(sections[currentIndex - 1]);
    }
}

// ===================================
// Loading State Management
// ===================================
window.addEventListener('load', () => {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.message);
    // In production, send error to logging service
});

// ===================================
// Network Status Monitoring
// ===================================
window.addEventListener('online', () => {
    console.log('Connection restored');
    showNetworkStatus('online');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    showNetworkStatus('offline');
});

function showNetworkStatus(status) {
    const existingStatus = document.querySelector('.network-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = 'network-status';
    statusDiv.style.position = 'fixed';
    statusDiv.style.bottom = '20px';
    statusDiv.style.left = '50%';
    statusDiv.style.transform = 'translateX(-50%)';
    statusDiv.style.padding = '1rem 2rem';
    statusDiv.style.borderRadius = '0.5rem';
    statusDiv.style.fontWeight = '600';
    statusDiv.style.zIndex = '9999';
    statusDiv.style.animation = 'slideUp 0.3s ease';
    
    if (status === 'online') {
        statusDiv.style.background = '#10b981';
        statusDiv.style.color = '#fff';
        statusDiv.innerHTML = '<i class="fas fa-wifi"></i> Connection Restored';
    } else {
        statusDiv.style.background = '#ef4444';
        statusDiv.style.color = '#fff';
        statusDiv.innerHTML = '<i class="fas fa-wifi-slash"></i> No Internet Connection';
    }
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        statusDiv.style.opacity = '0';
        setTimeout(() => statusDiv.remove(), 300);
    }, 3000);
}

// ===================================
// Print Styling
// ===================================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===================================
// Focus Management for Accessibility
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add focus visible class for keyboard navigation
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });
});

// ===================================
// Analytics Integration (Placeholder)
// ===================================
function trackEvent(category, action, label) {
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            trackEvent('Section View', 'viewed', sectionId);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// Service Worker Registration (PWA Support)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment in production with proper service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('Service Worker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('Service Worker registration failed:', error);
        //     });
    });
}

// ===================================
// Export functions for external use
// ===================================
window.portfolioApp = {
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) smoothScrollTo(section);
    },
    changeTheme: (theme) => {
        if (window.themeSwitcher) {
            window.themeSwitcher.setTheme(theme);
        }
    },
    getTheme: () => {
        return window.themeSwitcher ? window.themeSwitcher.getTheme() : 'purple';
    },
    trackEvent: trackEvent
};

console.log('Portfolio app loaded successfully! 🚀');
console.log('Version: 1.0.0');
console.log('Developer: VIMALESH S');
