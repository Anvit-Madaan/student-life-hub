import { useEffect, useMemo, useState } from 'react';
import api from '../api/api';

const types = ['notes', 'paper', 'guide', 'video', 'other'];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ subject: '', title: '', description: '', link: '', resourceType: 'notes', tags: '' });

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await api.get('/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Failed to load resources:', error);
      }
    };
    loadResources();
  }, []);

  const addResource = async (event) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.title.trim()) return;
    try {
      const response = await api.post('/resources', {
        subject: form.subject.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        fileUrl: form.link.trim(),
        resourceType: form.resourceType,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      });
      setResources((current) => [response.data, ...current]);
      setForm({ subject: '', title: '', description: '', link: '', resourceType: 'notes', tags: '' });
    } catch (error) {
      console.error('Failed to add resource:', error);
    }
  };

  const toggleBookmark = async (id) => {
    try {
      const response = await api.put(`/resources/${id}/bookmark`);
      setResources((current) => current.map((resource) => (resource._id === id ? response.data : resource)));
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  const visibleResources = useMemo(() => {
    if (filter === 'all') return resources;
    return resources.filter((resource) => resource.resourceType === filter);
  }, [filter, resources]);

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Resources</h1>
        <p>Upload subject notes, bookmark study guides, and organize your own materials.</p>
      </div>
      <div className="card">
        <form className="form-grid" onSubmit={addResource}>
          <label>
            Subject
            <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
          </label>
          <label>
            Title
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            Type
            <select value={form.resourceType} onChange={(e) => setForm({ ...form, resourceType: e.target.value })}>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Link
            <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://" />
          </label>
          <label className="full-width">
            Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" />
          </label>
          <label className="full-width">
            Tags
            <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="math, lab, exam" />
          </label>
          <button type="submit" className="button primary">Add resource</button>
        </form>
      </div>
      <div className="filter-row">
        <span>Browse types:</span>
        {['all', ...types].map((type) => (
          <button
            key={type}
            type="button"
            className={filter === type ? 'pill active' : 'pill'}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {visibleResources.length === 0 ? (
        <p className="muted">No resources saved yet. Add your first study item to start building your hub.</p>
      ) : (
        <div className="resource-grid">
          {visibleResources.map((resource) => (
            <article key={resource._id} className="resource-card card">
              <div className="market-header">
                <h3>{resource.title}</h3>
                <span className="chip">{resource.resourceType}</span>
              </div>
              <p className="muted">{resource.subject}</p>
              <p>{resource.description || 'No description available.'}</p>
              <div className="resource-meta">
                <span>{resource.tags?.join(', ') || 'No tags'}</span>
                {resource.fileUrl && (
                  <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="button secondary">
                    Open
                  </a>
                )}
              </div>
              <div className="forum-actions">
                <button type="button" className="pill" onClick={() => toggleBookmark(resource._id)}>
                  Bookmark
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
