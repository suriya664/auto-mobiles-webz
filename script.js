// ============================================
// AUTO CARE - JAVASCRIPT
// ============================================

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Function to close the menu
    function closeMenu() {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    // Function to toggle the menu
    function toggleMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    }

    if (hamburger && navMenu) {
        // Toggle menu when clicking hamburger
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on any navigation link (including Book Now button)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Allow the link to navigate, but close the menu
                closeMenu();
            });
        });

        // Specifically target the Book Now button to ensure it closes the menu
        const bookNowButton = navMenu.querySelector('.btn-book');
        if (bookNowButton) {
            bookNowButton.addEventListener('click', function(e) {
                closeMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    closeMenu();
                }
            }
        });

        // Close menu on window resize (optional - helps with responsive behavior)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 1024) {
                    closeMenu();
                }
            }, 250);
        });
    }
});

// ============================================
// REVIEWS SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const reviewsSlider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const reviewDots = document.getElementById('reviewDots');

    if (reviewsSlider && prevBtn && nextBtn) {
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        let currentIndex = 0;

        // Create dots
        if (reviewDots && reviewCards.length > 0) {
            reviewCards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(index));
                reviewDots.appendChild(dot);
            });
        }

        function showSlide(index) {
            reviewCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });

            // Update dots
            const dots = reviewDots?.querySelectorAll('.dot');
            if (dots) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % reviewCards.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
            showSlide(currentIndex);
        }

        function goToSlide(index) {
            currentIndex = index;
            showSlide(currentIndex);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play slider
        let autoPlayInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        if (reviewsSlider) {
            reviewsSlider.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            reviewsSlider.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 5000);
            });
        }
    }
});

// ============================================
// GALLERY FILTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
});

// ============================================
// BOOKING FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const appointmentDate = document.getElementById('appointmentDate');
    const serviceType = document.getElementById('serviceType');
    const summaryService = document.getElementById('summaryService');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');

    // Set minimum date to today
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.setAttribute('min', today);
    }

    // Update summary on form change
    function updateSummary() {
        if (serviceType && summaryService) {
            const selectedService = serviceType.options[serviceType.selectedIndex]?.text || '-';
            summaryService.textContent = selectedService;
        }

        if (appointmentDate && summaryDate) {
            const date = appointmentDate.value;
            if (date) {
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                summaryDate.textContent = formattedDate;
            } else {
                summaryDate.textContent = '-';
            }
        }

        const timeSelect = document.getElementById('appointmentTime');
        if (timeSelect && summaryTime) {
            const selectedTime = timeSelect.options[timeSelect.selectedIndex]?.text || '-';
            summaryTime.textContent = selectedTime;
        }
    }

    if (serviceType) {
        serviceType.addEventListener('change', updateSummary);
    }

    if (appointmentDate) {
        appointmentDate.addEventListener('change', updateSummary);
    }

    const timeSelect = document.getElementById('appointmentTime');
    if (timeSelect) {
        timeSelect.addEventListener('change', updateSummary);
    }

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);

            // Show success message (in a real application, this would send data to a server)
            alert('Booking confirmed! You will receive a confirmation email shortly.\n\n' +
                  'Service: ' + (serviceType?.options[serviceType.selectedIndex]?.text || '') + '\n' +
                  'Date: ' + (appointmentDate?.value || '') + '\n' +
                  'Time: ' + (timeSelect?.options[timeSelect.selectedIndex]?.text || ''));

            // Reset form
            bookingForm.reset();
            updateSummary();
        });
    }
});

// ============================================
// CONTACT FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show success message (in a real application, this would send data to a server)
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
});

// ============================================
// NEWSLETTER FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('#newsletterForm');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value;

            if (email) {
                // Show success message (in a real application, this would send data to a server)
                alert('Thank you for subscribing! You will receive our newsletter at ' + email);
                emailInput.value = '';
            }
        });
    });
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    });
});

// ============================================
// LAZY LOADING IMAGES (Performance Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ============================================
// FORM VALIDATION ENHANCEMENTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters except +, -, (, ), and spaces
            this.value = this.value.replace(/[^\d+\-() ]/g, '');
        });
    });

    const emailInputs = document.querySelectorAll('input[type="email"]');

    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#ddd';
                this.setCustomValidity('');
            }
        });
    });
});

// ============================================
// ANIMATION ON SCROLL (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    animateObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.service-card, .highlight-card, .blog-card, .testimonial-card, .team-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            animateObserver.observe(el);
        });
    }
});


