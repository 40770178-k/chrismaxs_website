/**
 * Chrismaxs Transportation - Main JavaScript File
 * Enhanced interactive functionality for the website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main App Initialization
function initializeApp() {
    setupMobileNavigation();
    setupSmoothScrolling();
    setupServiceCards();
    setupFormValidation();
    setupScrollAnimations();
    setupLoadingAnimations();
    setupPerformanceOptimizations();
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Add mobile toggle to navbar
    navbar.appendChild(mobileToggle);
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking on links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('mobile-active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
        }
    });
}

// Smooth Scrolling and Active Navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Service Cards Interactive Features
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.card');
    
    serviceCards.forEach((card, index) => {
        // Add click to expand functionality
        card.addEventListener('click', function() {
            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('card-active'));
            // Add active class to clicked card
            this.classList.add('card-active');
            
            // Create modal or expanded view
            showServiceModal(this, index);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('card-active')) {
                this.style.transform = '';
            }
        });
    });
}

// Service Modal Display
function showServiceModal(card, index) {
    const serviceData = [
        {
            title: 'Local Rides',
            description: 'Affordable and quick transport around town with our modern matatu fleet.',
            features: ['24/7 Service', 'Affordable Rates', 'Safe & Reliable', 'Local Routes'],
            price: 'From KSh 50'
        },
        {
            title: 'Long Distance',
            description: 'Comfortable travel to destinations across the country in our luxury buses.',
            features: ['Air Conditioning', 'Comfortable Seats', 'Entertainment', 'Refreshments'],
            price: 'From KSh 500'
        },
        {
            title: 'Corporate Hire',
            description: 'Professional transport solutions for corporate events and meetings.',
            features: ['Executive Vehicles', 'Professional Drivers', 'Flexible Scheduling', 'Corporate Rates'],
            price: 'Custom Quote'
        },
        {
            title: 'Supply Material',
            description: 'Efficient delivery of construction materials and supplies to your site.',
            features: ['Heavy Duty Trucks', 'Timely Delivery', 'Secure Transport', 'Bulk Orders'],
            price: 'Quote on Request'
        },
        {
            title: 'Bulk Transport by Lorries',
            description: 'Heavy-duty transport solutions for large cargo and bulk materials.',
            features: ['Heavy Lorries', 'Large Capacity', 'Nationwide Coverage', 'Specialized Equipment'],
            price: 'Quote on Request'
        }
    ];
    
    const service = serviceData[index];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-header">
                <h2>${service.title}</h2>
                <p class="modal-price">${service.price}</p>
            </div>
            <div class="modal-body">
                <p>${service.description}</p>
                <h3>Features:</h3>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="modal-actions">
                    <button class="btn modal-book" onclick="redirectToBooking('${service.title}')">Book Now</button>
                    <button class="btn btn-secondary modal-contact" onclick="redirectToContact()">Get Quote</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
    
    // Animate modal in
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 10);
}

// Close Modal Function
function closeModal(modal) {
    modal.classList.remove('modal-active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
    
    // Remove active class from cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('card-active');
        card.style.transform = '';
    });
}

// Redirect Functions
function redirectToBooking(serviceType = '') {
    const bookingUrl = 'pages/booking.html';
    if (serviceType) {
        window.location.href = `${bookingUrl}?service=${encodeURIComponent(serviceType)}`;
    } else {
        window.location.href = bookingUrl;
    }
}

function redirectToContact() {
    window.location.href = 'pages/contact.html';
}

// Form Validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Validate Form
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.id;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

// Show Field Error
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear Field Error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Get Field Label
function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name || 'Field';
}

// Submit Form
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .hero-text, .hero-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Loading Animations
function setupLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500);
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimizations
function setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Preload critical pages
    const criticalLinks = document.querySelectorAll('a[href*="booking"], a[href*="contact"]');
    criticalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = this.href;
            document.head.appendChild(linkElement);
        });
    });
}

// Handle Scroll Events
function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Add/remove scrolled class to header
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentNode.parentNode.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('notification-active');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('notification-active');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Utility Functions
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

// Initialize booking form with service parameter
function initializeBookingForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service');
    
    if (serviceType) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceType;
        }
    }
}

// Call booking form initialization if on booking page
if (window.location.pathname.includes('booking')) {
    document.addEventListener('DOMContentLoaded', initializeBookingForm);
}