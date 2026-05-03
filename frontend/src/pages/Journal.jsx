import { useEffect, useMemo, useState } from 'react';
import api from '../api/api';

const moods = ['happy', 'thoughtful', 'stressed', 'motivated', 'tired', 'neutral'];

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ text: '', mood: 'neutral', tags: '' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await api.get('/journal');
        setEntries(response.data);
      } catch (error) {
        console.error('Failed to load journal entries:', error);
      }
    };
    loadEntries();
  }, []);

  const filteredEntries = useMemo(() => {
    if (!query.trim()) return entries;
    return entries.filter((entry) =>
      entry.text.toLowerCase().includes(query.toLowerCase()) ||
      entry.tags.join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [entries, query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const entryBody = {
      text: form.text,
      mood: form.mood,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    };

    try {
      const response = await api.post('/journal', entryBody);
      setEntries((current) => [response.data, ...current]);
      setForm({ text: '', mood: 'neutral', tags: '' });
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Journal</h1>
        <p>Write, search, and reflect with private notes, mood tracking, and saved entries.</p>
      </div>
      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Your thoughts
            <textarea value={form.text} rows={6} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          </label>
          <div className="journal-meta-row">
            <label>
              Mood
              <select value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })}>
                {moods.map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </label>
            <label>
              Tags
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="study, reflection" />
            </label>
            <button type="submit" className="button primary">Save entry</button>
          </div>
        </form>
      </div>
      <div className="card">
        <div className="board-header">
          <h2>Saved entries</h2>
          <input type="search" placeholder="Search notes or tags" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {filteredEntries.length === 0 ? (
          <p>No entries yet. Write one to start your journal.</p>
        ) : (
          <ul className="journal-list">
            {filteredEntries.map((entry) => (
              <li key={entry._id} className="journal-item">
                <div className="journal-top">
                  <strong>{new Date(entry.date || entry.createdAt).toLocaleDateString()}</strong>
                  <span className="chip">{entry.mood}</span>
                </div>
                <p>{entry.text}</p>
                {entry.tags && entry.tags.length > 0 && <p className="muted">Tags: {entry.tags.join(', ')}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
