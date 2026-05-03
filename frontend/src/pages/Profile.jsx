import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <section className="page-section">
        <div className="section-header">
          <h1>Profile</h1>
          <p>Log in to access your student dashboard and progress analytics.</p>
        </div>
        <div className="card">
          <p>You are not logged in yet.</p>
          <button className="button primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Profile</h1>
        <p>Manage your student profile, progress stats, and achievements.</p>
      </div>
      <div className="grid two-up">
        <article className="card">
          <h2>Your details</h2>
          <p>
            Name: {user.name}<br />
            College: {user.college}<br />
            Course: {user.course}<br />
            Semester: {user.semester}
          </p>
        </article>
        <article className="card">
          <h2>Achievements</h2>
          <p>Task master badge, study streak badge, market seller badge.</p>
        </article>
      </div>
    </section>
  );
}
