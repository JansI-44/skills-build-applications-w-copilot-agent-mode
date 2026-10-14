import { useEffect, useState } from 'react'
import { fetchJson as fetch, normalizeRecords } from '../lib/api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch('/api/workouts/')
      .then((payload) => {
        if (!cancelled) {
          setWorkouts(normalizeRecords(payload))
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
          <h2 className="h4 mb-0">Workouts</h2>
          <span className="badge text-bg-secondary">{workouts.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.name}>
                <div className="border rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="h5 mb-0">{workout.name}</h3>
                    <span className="badge text-bg-light text-body">{workout.category}</span>
                  </div>
                  <p className="text-muted mb-2">{workout.description}</p>
                  <div className="small text-body-secondary">
                    <div><strong>Difficulty:</strong> {workout.difficulty}</div>
                    <div><strong>Duration:</strong> {workout.durationMinutes} min</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
