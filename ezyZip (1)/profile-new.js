// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyCORzz_rwEw-d6IRtVXOHKakdTsviqVESA",
    authDomain: "agritech-e76a4.firebaseapp.com",
    projectId: "agritech-e76a4",
    storageBucket: "agritech-e76a4.firebasestorage.app",
    messagingSenderId: "464017029058",
    appId: "1:464017029058:web:c745fb910f1a3b41e0085b",
    measurementId: "G-4GK5J4T5WL"
});

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

// Custom confirmation function
function showCustomConfirm(message, callback) {
    // Create confirmation dialog
    const dialog = document.createElement('div');
    dialog.className = 'custom-confirm-dialog';
    dialog.innerHTML = `
        <div class="confirm-content">
            <p>${message}</p>
            <div class="confirm-buttons">
                <button class="confirm-btn confirm-yes">Yes</button>
                <button class="confirm-btn confirm-no">No</button>
            </div>
        </div>
    `;
    
    // Style the dialog
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = dialog.querySelector('.confirm-content');
    content.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 12px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: slideInConfirm 0.3s ease-out;
    `;
    
    const buttons = dialog.querySelectorAll('.confirm-btn');
    buttons.forEach(btn => {
        btn.style.cssText = `
            margin: 0 8px;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
    });
    
    const yesBtn = dialog.querySelector('.confirm-yes');
    yesBtn.style.backgroundColor = '#2E7D32';
    yesBtn.style.color = 'white';
    
    const noBtn = dialog.querySelector('.confirm-no');
    noBtn.style.backgroundColor = '#f5f5f5';
    noBtn.style.color = '#333';
    
    // Add event listeners
    yesBtn.addEventListener('click', () => {
        dialog.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (dialog.parentNode) {
                dialog.parentNode.removeChild(dialog);
            }
            callback(true);
        }, 300);
    });
    
    noBtn.addEventListener('click', () => {
        dialog.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (dialog.parentNode) {
                dialog.parentNode.removeChild(dialog);
            }
            callback(false);
        }, 300);
    });
    
    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => {
                if (dialog.parentNode) {
                    dialog.parentNode.removeChild(dialog);
                }
                callback(false);
            }, 300);
        }
    });
    
    // Add to page
    document.body.appendChild(dialog);
    
    // Add CSS animations if not already present
    if (!document.querySelector('#confirm-styles')) {
        const style = document.createElement('style');
        style.id = 'confirm-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideInConfirm {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// UI Elements
const userDetails = document.getElementById('user-details');
const messageElement = document.getElementById('message');
const userAvatar = document.getElementById('userAvatar');

// Message display function
function showMessage(message, isError = false) {
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `message ${isError ? 'error' : 'success'}`;
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'message';
        }, 3000);
    }
}

// Profile functions
window.viewProfile = function() {
    const user = auth.currentUser;
    if (user) {
        userDetails.innerHTML = `
            <h3>${user.displayName || 'User'}</h3>
            <p><strong>Email:</strong> ${user.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${user.phoneNumber || 'Not provided'}</p>
            <p><strong>User ID:</strong> ${user.uid}</p>
        `;
    }
};

window.editProfile = function() {
    showCustomNotification('Profile editing will be available soon!', 'info');
};

// Logout function
window.logout = async function() {
    showCustomConfirm('Are you sure you want to logout?', async (confirmed) => {
        if (confirmed) {
            try {
                await signOut(auth);
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Logout error:', error);
                showMessage('Error logging out. Please try again.', true);
            }
        }
    });
};

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Update UI with user info
        if (userDetails) {
            userDetails.innerHTML = `
                <h3>${user.displayName || (user.email ? user.email.split('@')[0] : 'User')}</h3>
                <p>${user.email || user.phoneNumber || 'No contact info'}</p>
            `;
        }
        if (userAvatar) {
            userAvatar.src = user.photoURL || 'assets/agri-icon.png';
        }
    } else {
        // Only redirect if we're on profile page
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'profile.html') {
            window.location.href = 'login.html';
        }
    }
});
