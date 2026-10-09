import { useEffect, useState } from 'react'
import { fetchJson as fetch, normalizeRecords } from '../lib/api.js'

function getMemberNames(members) {
  if (!Array.isArray(members)) {
    return 'No members yet'
  }

  return members
    .map((member) => {
      if (!member) {
        return ''
      }

      if (typeof member === 'string') {
        return member
      }

      return member.displayName || member.username || 'Member'
    })
    .filter(Boolean)
    .join(', ') || 'No members yet'
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    fetch('/api/teams/')
      .then((payload) => {
        if (!cancelled) {
          setTeams(normalizeRecords(payload))
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
          <h2 className="h4 mb-0">Teams</h2>
          <span className="badge text-bg-success">{teams.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="border rounded-3 p-3 h-100">
                  <h3 className="h5 mb-2">{team.name}</h3>
                  <p className="text-muted mb-3">{team.description}</p>
                  <div className="small text-body-secondary">
                    <strong>Members:</strong> {getMemberNames(team.members)}
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
