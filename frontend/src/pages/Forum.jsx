import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';

const categories = ['study', 'career', 'mental health', 'college life', 'other'];

export default function Forum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ title: '', body: '', category: 'study', anonymous: false });
  const [reply, setReply] = useState({ postId: null, text: '' });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await api.get('/forum');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to load forum posts:', error);
      }
    };
    loadPosts();
  }, []);

  const visiblePosts = useMemo(() => {
    if (filter === 'all') return posts;
    return posts.filter((post) => post.category === filter);
  }, [filter, posts]);

  const submitQuestion = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    try {
      const response = await api.post('/forum', {
        anonymous: form.anonymous,
        category: form.category,
        title: form.title.trim(),
        body: form.body.trim()
      });
      setPosts((current) => [response.data, ...current]);
      setForm({ title: '', body: '', category: 'study', anonymous: false });
    } catch (error) {
      console.error('Failed to submit question:', error);
    }
  };

  const addAnswer = async (event) => {
    event.preventDefault();
    if (!reply.text.trim()) return;
    try {
      const response = await api.post(`/forum/${reply.postId}/answer`, { text: reply.text.trim() });
      setPosts((current) => current.map((post) => (post._id === reply.postId ? response.data : post)));
      setReply({ postId: null, text: '' });
    } catch (error) {
      console.error('Failed to add answer:', error);
    }
  };

  const vote = async (postId, direction) => {
    try {
      const response = await api.put(`/forum/${postId}/vote`, { vote: direction });
      setPosts((current) => current.map((post) => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const likeAnswer = async (postId, answerId) => {
    try {
      const response = await api.put(`/forum/${postId}/answer/${answerId}/like`);
      setPosts((current) => current.map((post) => (post._id === postId ? response.data : post)));
    } catch (error) {
      console.error('Failed to like answer:', error);
    }
  };

  const currentUserId = user?.id;

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Forum</h1>
        <p>Submit questions, browse previous answers, and help other students.</p>
      </div>
      <div className="card">
        <form className="form-grid" onSubmit={submitQuestion}>
          <label>
            Question title
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Details
            <textarea value={form.body} rows={4} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
          </label>
          <label className="inline-row">
            <input type="checkbox" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} />
            Post anonymously
          </label>
          <button type="submit" className="button primary">Submit question</button>
        </form>
      </div>
      <div className="filter-row">
        <span>Browse by category:</span>
        {['all', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={filter === category ? 'pill active' : 'pill'}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {visiblePosts.length === 0 ? (
        <p className="muted">No questions yet. Ask the first question to start the discussion.</p>
      ) : (
        <ul className="forum-list">
          {visiblePosts.map((post) => (
            <li key={post._id} className="forum-item">
              <div className="forum-header">
                <h3>{post.title}</h3>
                <span className="chip">{post.category}</span>
              </div>
              <p>{post.body}</p>
              <div className="forum-meta">
                <strong>{post.anonymous ? 'Anonymous' : String(post.user) === currentUserId ? 'Posted by you' : 'Posted by community'}</strong>
                <span>{post.votes} votes</span>
              </div>
              <div className="forum-actions">
                <button type="button" className="pill" onClick={() => vote(post._id, 'up')}>Upvote</button>
                <button type="button" className="pill" onClick={() => vote(post._id, 'down')}>Downvote</button>
                <button type="button" className="pill" onClick={() => setReply({ postId: post._id, text: '' })}>Answer</button>
              </div>
              {post.answers?.length > 0 && (
                <ul className="answer-list">
                  {post.answers.map((answer) => (
                    <li key={answer._id || answer.id} className="answer-item">
                      <p>{answer.text}</p>
                      <button type="button" className="pill" onClick={() => likeAnswer(post._id, answer._id || answer.id)}>
                        Like ({answer.likes})
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {reply.postId === post._id && (
                <form className="form-grid" onSubmit={addAnswer}>
                  <label>
                    Your answer
                    <textarea value={reply.text} rows={3} onChange={(e) => setReply({ ...reply, text: e.target.value })} required />
                  </label>
                  <button type="submit" className="button secondary">Post answer</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
