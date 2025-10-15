// JavaScript for Rent Flow Landing Page

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.service-card, .about-stats');
    animatedElements.forEach(element => {
        element.classList.add('loading');
    });
    
    // Counter animation for stats
    animateCounters();
});

// Show alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
    `;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Animate in
    setTimeout(() => {
        alert.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 300);
    }, 5000);
}

// Counter animation function
function animateCounters() {
    const counters = document.querySelectorAll('.about-stats h2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Mobile menu close on link click
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage && scrolled < heroSection.offsetHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(0, 123, 255, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .custom-alert .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .custom-alert .alert-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .custom-alert .alert-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading screen (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Modal functions
function showSignIn() {
    const signInModal = new bootstrap.Modal(document.getElementById('signInModal'));
    signInModal.show();
}

function showSignUp() {
    const signUpModal = new bootstrap.Modal(document.getElementById('signUpModal'));
    signUpModal.show();
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Sign In form handler
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;
            
            if (email && password) {
                showAlert('Welcome back! You have been signed in successfully.', 'success');
                bootstrap.Modal.getInstance(document.getElementById('signInModal')).hide();
                this.reset();
            } else {
                showAlert('Please fill in all required fields.', 'error');
            }
        });
    }
    
    // Sign Up form handler
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signUpEmail').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('signUpPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match. Please try again.', 'error');
                return;
            }
            
            if (!agreeTerms) {
                showAlert('Please agree to the Terms and Conditions.', 'error');
                return;
            }
            
            showAlert('Account created successfully! Welcome to Rent Flow.', 'success');
            bootstrap.Modal.getInstance(document.getElementById('signUpModal')).hide();
            this.reset();
        });
    }

    // Gallery Load More (Ready to Let)
    const loadMoreBtn = document.getElementById('loadMoreReady');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('#readyGrid .gallery-item.d-none');
            let count = 0;
            hiddenItems.forEach(item => {
                if (count < 3) {
                    item.classList.remove('d-none');
                    count++;
                }
            });
            if (document.querySelectorAll('#readyGrid .gallery-item.d-none').length === 0) {
                this.disabled = true;
                this.textContent = 'All loaded';
            }
        });
    }
});
