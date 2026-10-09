import { useEffect, useState } from 'react'
import { fetchJson as fetch, normalizeRecords } from '../lib/api.js'

function formatTeam(team) {
  if (!team) {
    return 'Unassigned'
  }

  if (typeof team === 'string') {
    return team
  }

  if (typeof team === 'object' && team.name) {
    return team.name
  }

  return 'Team'
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch('/api/users/')
      .then((payload) => {
        if (!cancelled) {
          setUsers(normalizeRecords(payload))
        }
      })
      .catch((loadError) => {
        if (!cancelled) {
          setError(loadError.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <span className="badge text-bg-primary">{users.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Display name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th className="text-end">Points</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || user.username}>
                    <td>{user.username}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{formatTeam(user.team)}</td>
                    <td className="text-end">{user.totalPoints ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
