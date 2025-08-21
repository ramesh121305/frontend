import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../utils/helpers';

export default function DishPage() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get(`/menu/${id}`);
        setDish(res.data);
      } catch (err) {
        // fallback sample
        setDish({ _id: id, name: 'Sample Dish', price: 199, description: 'Tasty dish', image: '/images/placeholder.png', isVeg:true });
      }
    }
    load();
  }, [id]);

  if (!dish) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={dish.image} alt={dish.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{dish.name} <span className={dish.isVeg ? 'badge badge-veg' : 'badge badge-nonveg'}>{dish.isVeg ? 'Veg' : 'Non-Veg'}</span></h2>
          <p className="text-muted">{dish.description}</p>
          <h4>{formatCurrency(dish.price)}</h4>
          <button className="btn btn-danger mt-3" onClick={() => addToCart(dish)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
