import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService'; // Import the login function
import './AuthForm.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      // --- THIS IS THE FIX ---
      // Save the received token to localStorage
      localStorage.setItem('token', response.token);
      // For now, we'll just show an alert. In the next step, we'll save the token.
      alert('Login successful!');
      console.log('Received token:', response.token);
      navigate('/'); // Redirect to the main editor page on success
    } catch (error) {
      alert(error.message); // Show error message (e.g., "Invalid credentials")
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default LoginPage;