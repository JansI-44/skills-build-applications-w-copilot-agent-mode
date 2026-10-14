import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function Home() {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="hero-panel p-4 rounded-4 shadow-sm">
          <p className="eyebrow mb-2">Octofit Tracker</p>
          <h1 className="display-5 fw-bold mb-3">Train smarter, compete together.</h1>
          <p className="lead text-body-secondary mb-0">
            Track activity, review team progress, and stay motivated with personalized fitness goals.
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="info-card h-100 p-4 border rounded-4">
          <h2 className="h4 mb-3">Overview</h2>
          <ul className="list-unstyled mb-0">
            <li>• User performance snapshots</li>
            <li>• Team-based fitness collaboration</li>
            <li>• Weekly and monthly leaderboards</li>
            <li>• Suggested workouts by category</li>
          </ul>
        </div>
      </div>

      <div className="col-md-6">
        <div className="info-card h-100 p-4 border rounded-4">
          <h2 className="h4 mb-3">Environment</h2>
          <p className="mb-2 text-body-secondary">
            API base URL is resolved from <code>import.meta.env.VITE_CODESPACE_NAME</code>.
          </p>
          <p className="mb-0 text-body-secondary">
            When the variable is unset, the app falls back to <strong>http://localhost:8000</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell container py-4">
      <header className="mb-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-4 px-3">
          <div className="container-fluid p-2">
            <NavLink className="navbar-brand fw-bold" to="/">
              Octofit
            </NavLink>
            <div className="navbar-nav ms-auto flex-row gap-2 flex-wrap">
              <NavLink className="nav-link px-3" to="/users">
                Users
              </NavLink>
              <NavLink className="nav-link px-3" to="/teams">
                Teams
              </NavLink>
              <NavLink className="nav-link px-3" to="/activities">
                Activities
              </NavLink>
              <NavLink className="nav-link px-3" to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink className="nav-link px-3" to="/workouts">
                Workouts
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
