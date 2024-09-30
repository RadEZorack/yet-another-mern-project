// src/pages/LoginPage.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      try {
        await auth.login(email, password);
        // Redirect to dashboard or home page
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
