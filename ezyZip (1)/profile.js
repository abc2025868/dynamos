// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

// DOM Elements
const userNameElement = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const logoutBtn = document.getElementById('logoutBtn');
const profileLink = document.getElementById('profileLink');
const userProfileSection = document.getElementById('userProfileSection');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        updateUserProfile(user);
    } else {
        // User is signed out
        window.location.href = 'login.html';
    }
});

// Update user profile information
function updateUserProfile(user) {
    if (user.displayName) {
        userNameElement.textContent = user.displayName;
    } else if (user.email) {
        userNameElement.textContent = user.email.split('@')[0];
    } else if (user.phoneNumber) {
        userNameElement.textContent = user.phoneNumber;
    }

    if (user.photoURL) {
        userAvatar.src = user.photoURL;
    }

    userProfileSection.style.display = 'block';
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });
}

// Profile settings
if (profileLink) {
    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your profile settings page navigation here
        // window.location.href = 'profile-settings.html';
        showCustomNotification('Profile settings coming soon!', 'info');
    });
}
