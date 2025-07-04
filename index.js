        // Initialize EmailJS
        emailjs.init('A_WfTHegWb0C6gwr_');

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const header = document.getElementById('header');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission with EmailJS and modal
        const form = document.getElementById('form');
        const successModal = document.getElementById('success-modal');
        const modalClose = document.querySelector('.modal-close');
        const modalOk = document.querySelector('.modal-ok');
        const submitBtn = document.getElementById('button');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const serviceID = 'service_bzgiuot';
            const templateID = 'template_x53efkh';
            
            setTimeout(() => {
                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        successModal.classList.add('active');
                        form.reset();
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    }, (err) => {
                        alert('Failed to send message: ' + JSON.stringify(err));
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    });
            }, 100);
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        modalOk.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animation on scroll
        const fadeElements = document.querySelectorAll('.fade-in');

        const appearOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.animation = `fadeIn 0.8s ease forwards ${entry.target.classList.contains('delay-1') ? '0.2s' : entry.target.classList.contains('delay-2') ? '0.4s' : entry.target.classList.contains('delay-3') ? '0.6s' : ''}`;
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        fadeElements.forEach(element => {
            appearOnScroll.observe(element);
        });