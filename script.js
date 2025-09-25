// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link or outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Enhanced Testimonials Carousel with Navigation Arrows
const testimonialTrack = document.querySelector('.testimonials-track');
const dots = document.querySelectorAll('.carousel-dot');
const prevArrow = document.querySelector('.carousel-arrow.prev');
const nextArrow = document.querySelector('.carousel-arrow.next');
let currentSlide = 0;
let autoAdvance;

function showSlide(index) {
    // Ensure index is within bounds
    if (index < 0) index = dots.length - 1;
    if (index >= dots.length) index = 0;
    
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentSlide = index;
    
    // Reset auto-advance timer
    resetAutoAdvance();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function resetAutoAdvance() {
    clearInterval(autoAdvance);
    autoAdvance = setInterval(nextSlide, 5000);
}

// Dot click events
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Arrow click events
if (prevArrow) {
    prevArrow.addEventListener('click', prevSlide);
}

if (nextArrow) {
    nextArrow.addEventListener('click', nextSlide);
}

// Auto-advance carousel
if (testimonialTrack) {
    resetAutoAdvance();
}

// Pause auto-advance on hover
const carouselContainer = document.querySelector('.testimonials-carousel');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        resetAutoAdvance();
    });
}

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}

// Toast Notification Function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set toast content based on type
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'info') icon = 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        hideToast(toast);
    }, 5000);
    
    // Close button event
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        hideToast(toast);
    });
    
    // Hide on click anywhere
    toast.addEventListener('click', (e) => {
        if (e.target === toast) {
            clearTimeout(autoRemove);
            hideToast(toast);
        }
    });
}

function hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 400);
}

// Form Handling
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Validate phone number (basic validation)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            showToast('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual form submission)
        setTimeout(() => {
            // Show success toast
            showToast('Appointment request submitted successfully! We will contact you shortly.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real implementation, you would send this data to EmailJS or another service
            console.log('Appointment Form Data:', formData);
            
        }, 1500);
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual form submission)
        setTimeout(() => {
            // Show success toast
            showToast('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In a real implementation, you would send this data to EmailJS or another service
            console.log('Contact Form Data:', formData);
            
        }, 1500);
    });
}

// Book Appointment button click handler
document.querySelectorAll('.btn-primary[href="#appointment"]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to appointment section
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
            window.scrollTo({
                top: appointmentSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Show toast message
            showToast('Navigating to appointment booking...', 'info');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Set minimum date for appointment to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set maximum date to 3 months from today
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
}

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for fade elements
fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', fadeInOnScroll);
// Trigger once on load
fadeInOnScroll();

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Brands carousel animation control on hover
const brandsCarousel = document.querySelector('.brands-carousel');
if (brandsCarousel) {
    brandsCarousel.addEventListener('mouseenter', () => {
        const carouselTrack = brandsCarousel.querySelector('.carousel-track');
        if (carouselTrack) {
            carouselTrack.style.animationPlayState = 'paused';
        }
    });
    
    brandsCarousel.addEventListener('mouseleave', () => {
        const carouselTrack = brandsCarousel.querySelector('.carousel-track');
        if (carouselTrack) {
            carouselTrack.style.animationPlayState = 'running';
        }
    });
}

// Frame card interaction enhancement
document.querySelectorAll('.frame-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card interaction
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// View all frames button functionality
const viewAllBtn = document.querySelector('.view-all');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Loading all frame collections...', 'info');
        
        // Simulate loading
        setTimeout(() => {
            // In a real implementation, this would load more frames or navigate to a frames page
            showToast('All frame collections loaded!', 'success');
        }, 1000);
    });
}

// Social media links functionality
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').className.split(' ')[1].split('-')[2];
        showToast(`Redirecting to our ${platform} page...`, 'info');
        
        // In a real implementation, this would actually redirect to social media pages
        setTimeout(() => {
            showToast(`Our ${platform} page would open in a new tab.`, 'info');
        }, 1000);
    });
});

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Selapisa Optometrist website loaded successfully!');
    
    // Show a welcome message
    setTimeout(() => {
        showToast('Welcome to Selapisa Optometrist!', 'info');
    }, 1000);
    
    // Add any additional initialization code here
});

// Performance optimization: Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Active nav highlighting (already implemented above)
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 10);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZkZGIi8+CjxwYXRoIGQ9Ik03NSA1MEgxMjVWMTUwSDc1VjUwWiIgZmlsbD0iI0UyRThGMCIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTRBM0I4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
        this.alt = 'Image not available';
    });
});