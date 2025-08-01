
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showError = (message) => {
    setError(message);
    setSuccess('');
    setTimeout(() => setError(''), 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setError('');
    setTimeout(() => setSuccess(''), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showError('Password should be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password);
      showSuccess('Account created successfully! You can now sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      showError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
    };
    return errorMessages[errorCode] || `Registration error: ${errorCode}`;
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <div className="signup-header">
          <h2>Join SmartUzhavan</h2>
          <p>Create your account to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <button className="link-btn" onClick={() => navigate('/login')}>Sign in here</button></p>
        </div>
        
        <div className="back-to-home">
          <button className="link-btn" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
