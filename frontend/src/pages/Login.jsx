import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const initialLogin = { email: '', password: '' };
const initialRegister = { name: '', email: '', college: '', course: '', semester: '', password: '' };

export default function Login() {
  const { login, register, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setMessage('Already signed in. Redirecting...');
      const timer = setTimeout(() => navigate('/dashboard'), 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const success = await login(loginForm);
    if (success) {
      setMessage('Welcome back! Redirecting to your dashboard...');
      setTimeout(() => navigate('/dashboard'), 600);
    } else {
      setMessage('Login failed. Check your credentials.');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const success = await register(registerForm);
    if (success) {
      setMessage('Account created! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 600);
    } else {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>{mode === 'login' ? 'Member Login' : 'Create Account'}</h1>
        <p>{mode === 'login' ? 'Access your student hub and manage your schedule, tasks, and resources.' : 'Sign up to unlock your personal student dashboard.'}</p>
      </div>
      <div className="auth-card card">
        <div className="auth-toggle">
          <button type="button" className={mode === 'login' ? 'pill active' : 'pill'} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'register' ? 'pill active' : 'pill'} onClick={() => setMode('register')}>
            Register
          </button>
        </div>
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="form-grid">
            <label>
              Email
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required />
            </label>
            <label>
              Password
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
            </label>
            <button type="submit" className="button primary">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="form-grid">
            <label>
              Name
              <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required />
            </label>
            <label>
              Email
              <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required />
            </label>
            <label>
              College
              <input type="text" value={registerForm.college} onChange={(e) => setRegisterForm({ ...registerForm, college: e.target.value })} required />
            </label>
            <label>
              Course
              <input type="text" value={registerForm.course} onChange={(e) => setRegisterForm({ ...registerForm, course: e.target.value })} required />
            </label>
            <label>
              Semester
              <input type="text" value={registerForm.semester} onChange={(e) => setRegisterForm({ ...registerForm, semester: e.target.value })} required />
            </label>
            <label>
              Password
              <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required />
            </label>
            <button type="submit" className="button primary">Create account</button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
}
