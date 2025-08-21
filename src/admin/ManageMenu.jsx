import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

export default function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get('/menu');
        setMenu(res.data);
      } catch {
        setMenu([]);
      }
    }
    load();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    // call backend to add item; here we just append locally
    const newItem = { _id: Date.now().toString(), name, price: Number(price), isVeg:true, category:'Misc', description:'' };
    setMenu(prev => [newItem, ...prev]);
    setName(''); setPrice('');
  };

  return (
    <div>
      <h4>Manage Menu</h4>
      <form onSubmit={addItem} className="mb-3 row g-2">
        <div className="col"><input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Dish name" required/></div>
        <div className="col" style={{maxWidth:120}}><input className="form-control" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" required/></div>
        <div className="col-auto"><button className="btn btn-success">Add</button></div>
      </form>

      <div className="row">
        {menu.map(item => (
          <div key={item._id} className="col-md-4">
            <div className="card p-3 mb-2">
              <div className="d-flex justify-content-between">
                <strong>{item.name}</strong>
                <small>₹{item.price}</small>
              </div>
              <p className="small text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
