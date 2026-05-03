import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

const defaultUser = {
  name: 'Guest Student',
  email: '',
  college: '',
  course: '',
  semester: ''
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('studentLifeUser');
    if (stored) {
      const payload = JSON.parse(stored);
      setUser(payload.user);
      setToken(payload.token);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: loggedInUser, token: authToken } = response.data;
      setUser(loggedInUser);
      setToken(authToken);
      window.localStorage.setItem('studentLifeUser', JSON.stringify({ user: loggedInUser, token: authToken }));
      return true;
    } catch (error) {
      const message = error?.response?.data?.error || error?.response?.data || error.message || 'Login failed';
      console.error('Login failed:', message);
      return message;
    }
  };

  const register = async ({ name, email, college, course, semester, password }) => {
    try {
      const response = await api.post('/auth/register', { name, email, college, course, semester, password });
      const { user: newUser, token: authToken } = response.data;
      setUser(newUser);
      setToken(authToken);
      window.localStorage.setItem('studentLifeUser', JSON.stringify({ user: newUser, token: authToken }));
      return true;
    } catch (error) {
      const message = error?.response?.data?.error || error?.response?.data || error.message || 'Registration failed';
      console.error('Registration failed:', message);
      return message;
    }
  };

  const logout = () => {
    setUser(defaultUser);
    setToken(null);
    window.localStorage.removeItem('studentLifeUser');
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
