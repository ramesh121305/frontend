export const formatCurrency = (n) => {
  if (typeof n !== 'number') n = Number(n) || 0;
  return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
};

export const calcCartTotal = (cart) =>
  cart.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0);
