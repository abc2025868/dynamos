// Login Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check if we have a language preference already
    const currentLanguage = localStorage.getItem('agri-lang') || 'en';
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Check if user is already logged in
    if (localStorage.getItem('agri-isLoggedIn') === 'true') {
        // Redirect to dashboard or home
        showToast(currentLanguage === 'en' ? 
            'You are already logged in. Redirecting...' : 
            'நீங்கள் ஏற்கனவே உள்நுழைந்துள்ளீர்கள். வழிநடத்துகிறது...', 'info');
            
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the appropriate form
            if (button.getAttribute('data-tab') === 'login') {
                loginForm.classList.add('active-form');
                signupForm.classList.remove('active-form');
            } else {
                loginForm.classList.remove('active-form');
                signupForm.classList.add('active-form');
            }
        });
    });
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.classList.remove('fa-eye-slash');
                button.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                button.classList.remove('fa-eye');
                button.classList.add('fa-eye-slash');
            }
        });
    });
    
    // Form submission handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (email && password) {
            // In a real app, this would validate credentials against a backend
            // For this demo, we'll simulate a successful login
            handleSuccessfulLogin(email);
        } else {
            showToast(currentLanguage === 'en' ? 
                'Please fill in all fields' : 
                'அனைத்து புலங்களையும் நிரப்பவும்', 'error');
        }
    });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const termsChecked = document.getElementById('terms').checked;
        
        // Simple validation
        if (name && email && phone && password && termsChecked) {
            // In a real app, this would create a new user account in the backend
            // For demo purposes, simulate account creation
            
            // Store user info in localStorage (not secure, just for demo)
            const userInfo = {
                name,
                email,
                phone,
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('agri-user', JSON.stringify(userInfo));
            
            // Show success toast
            showToast(currentLanguage === 'en' ? 
                'Account created successfully! Please verify your email.' : 
                'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! உங்கள் மின்னஞ்சலை சரிபார்க்கவும்.', 'success');
            
            // Reset form and switch to login tab
            signupForm.reset();
            tabButtons[0].click();
            
            // Automatically fill in the email in login form
            document.getElementById('login-email').value = email;
        } else {
            showToast(currentLanguage === 'en' ? 
                'Please fill in all fields and accept the terms' : 
                'அனைத்து புலங்களையும் நிரப்பி விதிமுறைகளை ஏற்கவும்', 'error');
        }
    });
    
    function handleSuccessfulLogin(userEmail) {
        // Store login state
        localStorage.setItem('agri-isLoggedIn', 'true');
        
        // If we don't have user info already stored, create basic info
        if (!localStorage.getItem('agri-user')) {
            const userInfo = {
                email: userEmail,
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem('agri-user', JSON.stringify(userInfo));
        } else {
            // Update last login time
            const userInfo = JSON.parse(localStorage.getItem('agri-user'));
            userInfo.lastLogin = new Date().toISOString();
            localStorage.setItem('agri-user', JSON.stringify(userInfo));
        }
        
        // Show success toast
        showToast(currentLanguage === 'en' ? 
            'Login successful! Redirecting...' : 
            'உள்நுழைவு வெற்றிகரமாக முடிந்தது! வழிநடத்துகிறது...', 'success');
        
        // Redirect after login
        setTimeout(() => {
            // Check if there's a redirect parameter in the URL (e.g., ?redirect=index.html)
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect') || 'dashboard.html';
            window.location.href = redirectUrl;
        }, 2000);
    }
    
    // Add event listener for 'Return to Home' link in the navbar
    const homeLink = document.querySelector('.navbar-links a[href="index.html"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            // No special handling needed, just let the browser navigate
        });
    }
    
    // Toast notification function
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Create toast content
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 
                         type === 'error' ? 'fas fa-exclamation-circle' : 
                         'fas fa-info-circle';
        
        const messageText = document.createElement('span');
        messageText.textContent = message;
        
        // Append elements
        toast.appendChild(icon);
        toast.appendChild(messageText);
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide and remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}); 