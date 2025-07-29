// Navbar Loader - Loads the shared navbar into all pages
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insert navbar at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Set active menu item based on current page
            setActiveMenuItem();
            
            // Initialize navbar functionality
            initializeNavbar();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Set active menu item based on current page
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.navbar-menu .menu-item');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        if (href) {
            const linkPage = href.split('/').pop().split('#')[0] || 'index.html';
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                item.classList.add('active');
            }
        }
    });
}

// Initialize navbar functionality
function initializeNavbar() {
    // Handle smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('.navbar-menu a[href*="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const [page, section] = href.split('#');
                
                if (page && page !== window.location.pathname.split('/').pop()) {
                    // Navigate to different page and scroll to section
                    localStorage.setItem('scrollToSection', section);
                    window.location.href = href;
                } else if (section) {
                    // Scroll to section on current page
                    e.preventDefault();
                    const targetSection = document.getElementById(section);
                    if (targetSection) {
                        const headerOffset = document.querySelector('.navbar').offsetHeight;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset - 20;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // Handle language dropdown
    const languageDropdown = document.querySelector('.language-dropdown');
    if (languageDropdown) {
        languageDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });
    }
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);
