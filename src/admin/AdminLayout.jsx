import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Panel</h2>
        <div>
          <Link to="/admin/manage-menu" className="btn btn-outline-primary me-2">Manage Menu</Link>
          <Link to="/admin/orders" className="btn btn-outline-secondary">Orders</Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
