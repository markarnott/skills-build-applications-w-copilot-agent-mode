import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div className="app-shell">
      <section className="hero-card">
        <div className="hero-brand">
          <img src="/octofitapp-small.png" alt="OctoFit Tracker logo" className="logo" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Train. Track. Compete.</h1>
          </div>
        </div>
        <p className="lead">
          A modern multi-tier fitness platform for workouts, teams, and leaderboards.
        </p>
        <div className="d-flex gap-3 flex-wrap">
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Open dashboard
          </Link>
          <span className="status-pill">Frontend on port 5173</span>
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="app-shell">
      <section className="panel-card">
        <h2>Dashboard</h2>
        <p>
          Connect this tier to the backend API on port 8000 and MongoDB on port 27017.
        </p>
        <Link to="/" className="btn btn-outline-light">
          Back home
        </Link>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
