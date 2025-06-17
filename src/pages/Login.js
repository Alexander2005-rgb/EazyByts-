import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  backgroundColor: '#fff',
  fontFamily: 'Arial, sans-serif',
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // Registration API call
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
        let data;
        try {
          data = await response.json();
        } catch (err) {
          setError('Registration failed: Invalid server response');
          return;
        }
        if (!response.ok) {
          setError(data.message || 'Registration failed');
        } else {
          localStorage.setItem('token', data.token);
          navigate('/login');
        }
      } catch (err) {
        setError('Registration failed: ' + err.message);
      }
    } else {
      // Login API call
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        let data;
        try {
          data = await response.json();
        } catch (err) {
          setError('Login failed: Invalid server response');
          return;
        }
        if (!response.ok) {
          setError(data.message || 'Login failed');
        } else {
          localStorage.setItem('token', data.token);
          navigate('/cms');
        }
      } catch (err) {
        setError('Login failed: ' + err.message);
      }
    }
  };

  return (
    <div style={cardStyle}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              style={{ color: 'black' }}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{ color: 'black' }}
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
            placeholder={isRegister ? "Enter your password" : "Enter your password"}
            style={{ color: 'black' }}
            required
          />
        </div>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            style={{ color: 'black' }}
            required
          />
          </div>
        )}
        <button type="submit" className="btn">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={toggleForm} className="toggle-btn">
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
