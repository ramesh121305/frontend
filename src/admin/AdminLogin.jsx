import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // accept only admin@demo.com as admin in this starter
    if (email === 'admin@demo.com' && password === 'admin') {
      login({ name: 'Admin', email, isAdmin: true });
      nav('/admin');
    } else {
      alert('Use admin@demo.com / admin');
    }
  };

  return (
    <div className="container">
      <h3>Admin Login</h3>
      <form onSubmit={submit} className="col-md-6">
        <div className="mb-3"><label>Email</label><input className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <div className="mb-3"><label>Password</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)}/></div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
