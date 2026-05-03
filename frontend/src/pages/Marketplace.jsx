import { useEffect, useMemo, useState } from 'react';
import api from '../api/api';

const categories = ['books', 'notes', 'stationery', 'electronics', 'furniture', 'other'];

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ title: '', category: 'books', price: '', condition: 'used', location: '', description: '' });

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await api.get(filter === 'all' ? '/marketplace' : `/marketplace?category=${filter}`);
        setListings(response.data);
      } catch (error) {
        console.error('Failed to load marketplace listings:', error);
      }
    };
    loadListings();
  }, [filter]);

  const addListing = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.price.trim() || !form.description.trim()) return;
    try {
      const response = await api.post('/marketplace', {
        title: form.title.trim(),
        category: form.category,
        price: Number(form.price),
        condition: form.condition,
        location: form.location.trim(),
        description: form.description.trim()
      });
      setListings((current) => [response.data, ...current]);
      setForm({ title: '', category: 'books', price: '', condition: 'used', location: '', description: '' });
    } catch (error) {
      console.error('Failed to add listing:', error);
    }
  };

  const visibleListings = useMemo(() => {
    if (filter === 'all') return listings;
    return listings;
  }, [filter, listings]);

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Marketplace</h1>
        <p>Buy, sell, and rent campus essentials with category browsing and local listings.</p>
      </div>
      <div className="card">
        <h2>List an item</h2>
        <form className="form-grid" onSubmit={addListing}>
          <label>
            Item name
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label>
            Price
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </label>
          <label>
            Condition
            <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
              <option value="new">New</option>
              <option value="like new">Like new</option>
              <option value="used">Used</option>
              <option value="fair">Fair</option>
            </select>
          </label>
          <label>
            Location
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="College area" />
          </label>
          <label className="full-width">
            Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" required />
          </label>
          <button type="submit" className="button primary">Add listing</button>
        </form>
      </div>
      <div className="filter-row">
        <span>Browse categories:</span>
        {['all', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            className={filter === cat ? 'pill active' : 'pill'}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {visibleListings.length === 0 ? (
        <p className="muted">No marketplace listings yet. Add your first item to share it with other students.</p>
      ) : (
        <div className="market-grid">
          {visibleListings.map((item) => (
            <article key={item._id} className="market-card card">
              <div className="market-header">
                <h3>{item.title}</h3>
                <span className="chip">{item.category}</span>
              </div>
              <p>{item.description || 'No description provided.'}</p>
              <div className="market-meta">
                <span>${item.price}</span>
                <span>{item.condition}</span>
              </div>
              <div className="market-footer">
                <span>{item.location || 'Campus'}</span>
                <button type="button" className="button secondary">Message seller</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
