import React from 'react';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="mb-3">
      <div className="btn-group">
        <button className={`btn ${active === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onChange('all')}>All</button>
        {categories.map(cat => (
          <button key={cat} className={`btn ${active === cat ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onChange(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
