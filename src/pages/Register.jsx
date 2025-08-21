// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

export default function Register() {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/users/register', { name, email, password });
      navigate('/login'); // go to login after successful registration
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ background: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '10px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4" style={{ color: '#ff5733', fontWeight: 'bold' }}>Register</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>

            <button className="btn w-100" style={{ backgroundColor: '#ff5733', color: '#fff' }} disabled={loading}>
              {loading ? 'Registering…' : 'Register'}
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login" style={{ color: '#ff5733', fontWeight: 'bold', textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
