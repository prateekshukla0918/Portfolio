// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-links a');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const themeSwitcher = document.querySelector('.theme-switcher');
const backToTopBtn = document.querySelector('.back-to-top');
const projectFilters = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Main document loaded event
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollEvents();
    initializeProjectFilter();
    initializeContactForm();
    addTypingEffect();
});

// Initialize Navigation
function initializeNavigation() {
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Create and add overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenu);
    });
    
    // Close menu button
    closeBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Highlight active nav link based on scroll position
    updateActiveNavLink();
}

// Close mobile menu
function closeMenu() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Initialize Theme Toggle
function initializeThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle click event
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize Scroll Events
function initializeScrollEvents() {
    window.addEventListener('scroll', () => {
        // Update the header style when scrolling
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show or hide the back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Back to top button click event
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    // Get current scroll position
    let scrollPosition = window.scrollY + 300;
    
    // Loop through sections to get the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to the current section link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Initialize Project Filter
function initializeProjectFilter() {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            projectFilters.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize Contact Form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showFormNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real app, you would send this data to a server
            // For demonstration, we'll simulate a successful submission
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            showFormNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Show form notification
function showFormNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    
    // Add to form
    contactForm.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add typing effect to the hero title
function addTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < originalText.length) {
            titleElement.textContent += originalText.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
            // Add blinking cursor after typing is complete
            addBlinkingCursor(titleElement);
        }
    }, 100);
}

// Add blinking cursor after typing animation
function addBlinkingCursor(element) {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.marginLeft = '5px';
    cursor.style.animation = 'blink 1s infinite';
    
    // Create style for blinking animation if not exists
    if (!document.querySelector('#typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.appendChild(cursor);
}

// Apply animation on scroll for skills and project sections
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);
