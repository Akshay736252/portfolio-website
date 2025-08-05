document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
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

    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Add shadow to navbar on scroll
        if (scrollPosition > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
        
        // Highlight active nav link
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Animate progress bars when skills section is in view
    const skillsSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const data = new FormData(contactForm);
  const action = contactForm.action;

  const response = await fetch(action, {
    method: 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    formMessage.style.display = 'block';
    formMessage.textContent = "Thanks! Your message has been sent.";
    contactForm.reset();
    setTimeout(() => formMessage.style.display = 'none', 5000);
  } else {
    formMessage.style.display = 'block';
    formMessage.textContent = "Something went wrong. Please try again later.";
  }
});


    function simulateFormSubmission(data) {
        // This is where you would normally send data to a server
        // For demonstration, we'll store submissions in a JSON file
        
        // Create a submissions directory if it doesn't exist
        // Note: This won't work client-side - in a real app, you'd need server-side code
        console.log('Form submission data:', data);
        
        // Show success message
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('success');
        }, 5000);
        
        // In a real application, you would use fetch() to send data to a server endpoint
        // Example:
        /*
        fetch('submit-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = data.message;
            formMessage.classList.add(data.success ? 'success' : 'error');
            formMessage.style.display = 'block';
            
            if (data.success) {
                contactForm.reset();
            }
            
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.classList.remove('success', 'error');
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.textContent = 'An error occurred. Please try again later.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.classList.remove('error');
            }, 5000);
        });
        */
    }
});