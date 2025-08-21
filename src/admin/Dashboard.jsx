import React from 'react';

export default function Dashboard() {
  return (
    <div className="card p-4">
      <h4>Dashboard</h4>
      <div className="row">
        <div className="col-md-4"><div className="p-3 border rounded">Total Orders<br/><strong>12</strong></div></div>
        <div className="col-md-4"><div className="p-3 border rounded">Total Revenue<br/><strong>₹24,500</strong></div></div>
        <div className="col-md-4"><div className="p-3 border rounded">Active Items<br/><strong>24</strong></div></div>
      </div>
    </div>
  );
}
