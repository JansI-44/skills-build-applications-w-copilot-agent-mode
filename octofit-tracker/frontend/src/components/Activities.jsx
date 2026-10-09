import { useEffect, useState } from 'react'
import { fetchJson as fetch, normalizeRecords } from '../lib/api.js'

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return new Date(value).toLocaleString()
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch('/api/activities/')
      .then((payload) => {
        if (!cancelled) {
          setActivities(normalizeRecords(payload))
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
          <h2 className="h4 mb-0">Activities</h2>
          <span className="badge text-bg-info">{activities.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.performedAt}>
                    <td>{activity.user?.displayName || activity.user?.username || 'Unknown user'}</td>
                    <td>{activity.activityType}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
                    <td>{activity.calories ?? 0}</td>
                    <td>{formatDate(activity.performedAt)}</td>
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
