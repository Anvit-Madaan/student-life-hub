import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Journal', path: '/journal' },
  { label: 'Forum', path: '/forum' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
  { label: 'Profile', path: '/profile' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Student Life Hub</div>
      <nav className="sidebar-nav">
        {links.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">Your college companion</div>
    </aside>
  );
}
