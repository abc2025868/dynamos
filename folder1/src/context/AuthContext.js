

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  console.error('Please create a .env file in the folder1 directory with the required Firebase configuration.');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign in with email and password
  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  function signInWithGoogle() {
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return signInWithPopup(auth, googleProvider);
  }

  // Phone authentication
  function setupRecaptcha(elementId) {
    return new RecaptchaVerifier(auth, elementId, {
      'size': 'normal',
      'callback': () => {
        console.log('reCAPTCHA verified successfully');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
      }
    });
  }

  function sendOTP(phoneNumber, recaptchaVerifier) {
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  }

  // Logout
  function logout() {
    localStorage.removeItem('user');
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        };
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signInWithGoogle,
    setupRecaptcha,
    sendOTP,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
