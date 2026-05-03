import { useState } from 'react';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Contact Us</h1>
        <p>Send feedback, request new study features, or ask for support.</p>
      </div>
      <div className="card contact-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label>
            Subject
            <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
          </label>
          <label className="full-width">
            Message
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="6" required />
          </label>
          <button type="submit" className="button primary">Send message</button>
        </form>
        {submitted && <p className="message success">Thanks! We received your message and will respond soon.</p>}
      </div>
    </section>
  );
}
