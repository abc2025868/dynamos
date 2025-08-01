// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
    getAuth, 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHcYWlsg68iI-bU3tVwfcUsYWdvDWqfx0",
    authDomain: "project-kissan-48284.firebaseapp.com",
    projectId: "project-kissan-48284",
    storageBucket: "project-kissan-48284.firebasestorage.app",
    messagingSenderId: "703745405679",
    appId: "1:703745405679:web:3c8527de0da484c99e211a",
    measurementId: "G-HNHNSERLDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Custom notification function
function showCustomNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInNotification 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2E7D32';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#c62828';
    } else {
        notification.style.backgroundColor = '#1976d2';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// User menu functionality
function initUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    const userAvatar = document.querySelector('.user-avatar');

    // Toggle menu on avatar click
    if (userAvatar) {
        userAvatar.addEventListener('click', () => {
            userMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-profile') && userMenu.classList.contains('active')) {
            userMenu.classList.remove('active');
        }
    });

    // Handle menu actions
    document.querySelectorAll('.menu-option').forEach(option => {
        option.addEventListener('click', async (e) => {
            e.preventDefault();
            const action = e.currentTarget.dataset.action;

            switch (action) {
                case 'profile':
                    window.location.href = 'profile-settings.html';
                    break;
                case 'account':
                    window.location.href = 'account-settings.html';
                    break;
                case 'logout':
                    try {
                        await signOut(auth);
                        localStorage.removeItem('user');
                        window.location.href = 'login.html';
                    } catch (error) {
                        console.error('Error signing out:', error);
                        showCustomNotification('Error signing out. Please try again.', 'error');
                    }
                    break;
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initUserMenu);
