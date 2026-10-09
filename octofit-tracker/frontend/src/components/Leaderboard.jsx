import { useEffect, useState } from 'react'
import { fetchJson, normalizeRecords } from '../lib/api.js'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetchJson('/api/leaderboard/')
      .then((payload) => {
        if (!cancelled) {
          setLeaderboard(normalizeRecords(payload))
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
          <h2 className="h4 mb-0">Leaderboard</h2>
          <span className="badge text-bg-warning">{leaderboard.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Period</th>
                  <th className="text-end">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id || entry.id || `${entry.rank}-${entry.user?._id || entry.user}`}>
                    <td>#{entry.rank}</td>
                    <td>{entry.user?.displayName || entry.user?.username || 'Unknown user'}</td>
                    <td>{entry.team?.name || 'Unknown team'}</td>
                    <td>{entry.period}</td>
                    <td className="text-end">{entry.points}</td>
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
