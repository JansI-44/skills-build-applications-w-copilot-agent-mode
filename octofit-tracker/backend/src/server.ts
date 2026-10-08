import express from 'express'

const app = express()
const port = Number(process.env.PORT || 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

const dataTierPending = (resource: string) => (_request: express.Request, response: express.Response) => {
  response.status(501).json({
    error: `${resource} endpoint is not available until the data tier is configured.`,
  })
}

app.get('/api/users/', dataTierPending('Users'))
app.get('/api/teams/', dataTierPending('Teams'))
app.get('/api/activities/', dataTierPending('Activities'))
app.get('/api/leaderboard/', dataTierPending('Leaderboard'))
app.get('/api/workouts/', dataTierPending('Workouts'))

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`)
})
