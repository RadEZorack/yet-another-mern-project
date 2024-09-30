// src/pages/RegisterPage.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      try {
        await auth.register(username, email, password);
        // Redirect to dashboard or home page
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
