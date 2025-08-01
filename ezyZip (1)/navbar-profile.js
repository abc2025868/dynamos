// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

// Update navbar profile when user is logged in
function updateNavbarProfile(user) {
    const loginSection = document.getElementById('loginSection');
    const userSection = document.getElementById('userSection');
    const navUserAvatar = document.getElementById('navUserAvatar');
    const navUserNameProfile = document.getElementById('navUserNameProfile');
    const navUserNameDropdown = document.getElementById('navUserNameDropdown');
    
    if (user) {
        // User is logged in
        if (loginSection) loginSection.style.display = 'none';
        if (userSection) userSection.style.display = 'block';
        
        // Update user info
        if (navUserAvatar) {
            navUserAvatar.src = user.photoURL || 'assets/agri-icon.png';
            navUserAvatar.alt = user.displayName || 'User Avatar';
        }
        
        // Update both user name elements
        const userName = user.displayName || user.email || 'User';
        if (navUserNameProfile) {
            navUserNameProfile.textContent = userName;
        }
        if (navUserNameDropdown) {
            navUserNameDropdown.textContent = userName;
        }
        
        // Store user data in localStorage
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
    } else {
        // User is not logged in
        if (loginSection) loginSection.style.display = 'block';
        if (userSection) userSection.style.display = 'none';
        
        // Clear user data
        localStorage.removeItem('user');
        
        // Reset to default values
        if (navUserAvatar) {
            navUserAvatar.src = 'assets/agri-icon.png';
            navUserAvatar.alt = 'Profile';
        }
        if (navUserNameProfile) {
            navUserNameProfile.textContent = 'User';
        }
        if (navUserNameDropdown) {
            navUserNameDropdown.textContent = 'User';
        }
    }
}

// Logout function
window.logoutUser = async function() {
    console.log('Logout function called');
    try {
        await signOut(auth);
        console.log('User signed out successfully');
        showCustomNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error('Logout error:', error);
        showCustomNotification('Error logging out. Please try again.', 'error');
    }
};

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

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    updateNavbarProfile(user);
    
    // If on login page and user is authenticated, redirect to home
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (user && currentPage === 'login.html') {
        window.location.href = 'index.html';
    }
});

// Initialize profile when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        updateNavbarProfile(user);
    }
    
    // Add click event for user dropdown
    const userInfoNav = document.querySelector('.user-info-nav');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userInfoNav && userDropdown) {
        userInfoNav.addEventListener('click', (e) => {
            e.preventDefault();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userInfoNav.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
});
