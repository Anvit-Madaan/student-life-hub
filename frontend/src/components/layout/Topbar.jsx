import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Topbar() {
  const { mode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div>
        <span className="page-title">Student Life Hub</span>
        {isAuthenticated && <span className="topbar-subtitle">Welcome, {user.name}</span>}
      </div>
      <div className="topbar-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {mode === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        {isAuthenticated ? (
          <button className="button secondary" onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </button>
        ) : (
          <button className="button secondary" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
