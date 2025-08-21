// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await apiClient.post('/users/login', { email, password });

      if (!data?.token) throw new Error('Login failed');

      login({
        user: {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          isAdmin: data.isAdmin,
        },
        token: data.token,
      });

      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4" style={{ color: '#ff5733', fontWeight: 'bold' }}>Login</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button className="btn w-100" style={{ backgroundColor: '#ff5733', color: '#fff' }} disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/register" style={{ color: '#ff5733', fontWeight: 'bold', textDecoration: 'none' }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
