/**
 * Portfolio Website JavaScript
 * 
 * This file contains all the interactive functionality for the portfolio website.
 * It includes features like preloader, theme toggle, navigation, portfolio filtering,
 * testimonial slider, form validation, and more.
 * 
 * @author John Doe
 * @version 1.0.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page is fully loaded
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercentage + '%';
    });
    
    // Typing Animation
    const typingElement = document.querySelector('.typing');
    
    if (typingElement) {
        const words = ["Web Developer", "UI/UX Designer", "Freelancer", "Content Creator"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            typingElement.textContent = currentChar;
            typingElement.classList.add('stop-blinking');
            
            if (!isDeleting && charIndex < currentWord.length) {
                // If typing
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                // If deleting
                charIndex--;
                setTimeout(type, 50);
            } else {
                // If word is complete
                isDeleting = !isDeleting;
                typingElement.classList.remove('stop-blinking');
                
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 1200);
                } else {
                    setTimeout(type, 500);
                }
            }
        }
        
        setTimeout(type, 1000);
    }
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle position based on current theme
    if (themeToggle) {
        if (savedTheme === 'dark') {
            themeToggle.querySelector('.theme-toggle-ball').style.transform = 'translateX(28px)';
        }
        
        // Toggle theme when switch is clicked
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Update the theme
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Move the toggle ball
            const ball = this.querySelector('.theme-toggle-ball');
            if (newTheme === 'dark') {
                ball.style.transform = 'translateX(28px)';
            } else {
                ball.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Portfolio Item Click - Show Project Details
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const projectDetails = document.getElementById('project-details');
    const closeDetails = document.querySelector('.close-details');
    const backBtn = document.querySelector('.back-btn');

    if (viewDetailsButtons.length > 0 && projectDetails) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                projectDetails.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });

        // Close project details using X button
        if (closeDetails) {
            closeDetails.addEventListener('click', function() {
                projectDetails.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Close project details using Back button
        if (backBtn) {
            backBtn.addEventListener('click', function(e) {
                e.preventDefault();
                projectDetails.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Close project details when clicking outside the content
        projectDetails.addEventListener('click', function(e) {
            if (e.target === this) {
                projectDetails.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(faq => {
                    if (faq !== item) {
                        faq.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
                
                // Change icon
                const icon = this.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    
    if (testimonials.length > 0 && prevSlide && nextSlide) {
        let currentSlide = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Show next testimonial
        nextSlide.addEventListener('click', function() {
            testimonials[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % testimonials.length;
            testimonials[currentSlide].style.display = 'block';
        });
        
        // Show previous testimonial
        prevSlide.addEventListener('click', function() {
            testimonials[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            testimonials[currentSlide].style.display = 'block';
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real implementation, you would send this data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add scroll to top button styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: #fff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--dark-color);
        }
    `;
    document.head.appendChild(style);
});