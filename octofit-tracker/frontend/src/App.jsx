import { Link, NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './lib/api.js';

const navigationLinks = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function AppLayout() {
  return (
    <div className="app-frame">
      <header className="topbar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-0 gap-3 align-items-start align-items-lg-center">
          <Link to="/" className="topbar-brand text-decoration-none">
            <img src="/octofitapp-small.png" alt="OctoFit Tracker logo" className="logo logo--small" />
            <div>
              <p className="eyebrow">OctoFit Tracker</p>
              <p className="topbar-tagline">Multi-tier fitness dashboard</p>
            </div>
          </Link>
          <nav className="nav nav-pills gap-2 ms-lg-auto flex-wrap">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="page-content container-fluid px-0">
        <Outlet />
      </main>
      <footer className="page-footer">
        <span>Backend base URL: {getApiBaseUrl()}</span>
        <span>Define VITE_CODESPACE_NAME in .env.local for Codespaces.</span>
      </footer>
    </div>
  );
}

function Home() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <section className="app-shell hero-shell">
      <div className="hero-card hero-card--wide">
        <div className="hero-brand">
          <img src="/octofitapp-small.png" alt="OctoFit Tracker logo" className="logo" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Train. Track. Compete.</h1>
          </div>
        </div>
        <p className="lead">
          React 19 presentation tier for the OctoFit Tracker multi-tier stack, wired to the backend
          API and ready for team, workout, activity, and leaderboard views.
        </p>
        <div className="d-flex gap-3 flex-wrap align-items-center">
          <Link to="/dashboard" className="btn btn-outline-light btn-lg">
            Open dashboard
          </Link>
          <Link to="/activities" className="btn btn-primary btn-lg">
            View activities
          </Link>
          <Link to="/leaderboard" className="btn btn-outline-light btn-lg">
            View leaderboard
          </Link>
          <span className="status-pill">Frontend on port 5173</span>
        </div>
      </div>
      <div className="panel-card info-card">
        <h2>API connection</h2>
        <p>
          Set <strong>VITE_CODESPACE_NAME</strong> in <code>.env.local</code> so the frontend can
          build the Codespaces API URL. If it is missing, the app safely falls back to localhost
          and avoids <code>https://undefined-8000.app.github.dev</code>.
        </p>
        <div className="alert alert-warning mb-0">
          Current API base: <strong>{apiBaseUrl}</strong>
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="app-shell dashboard-shell">
      <div className="panel-card">
        <h2>Dashboard</h2>
        <p>
          Use the navigation above to jump between the resource views. Each view loads data from
          the backend on the Codespaces API host or from localhost when the env var is unset.
        </p>
        <div className="d-flex gap-3 flex-wrap">
          <Link to="/activities" className="btn btn-primary">
            Activities
          </Link>
          <Link to="/teams" className="btn btn-outline-light">
            Teams
          </Link>
        </div>
      </div>
      <div className="resource-links">
        {navigationLinks.map((link) => (
          <Link key={link.to} to={link.to} className="resource-link-card">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="activities" element={<Activities />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="users" element={<Users />} />
        <Route path="workouts" element={<Workouts />} />
      </Route>
    </Routes>
  );
}
