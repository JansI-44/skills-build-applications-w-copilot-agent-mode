# Octofit Tracker Frontend

This React app consumes the Octofit Tracker API and renders the user, team, activity, leaderboard, and workout data. The frontend resolves the API base URL from `VITE_CODESPACE_NAME` and falls back to `http://localhost:8000` when that value is not defined.

## Required environment variable

Create a `.env.local` file in this directory with a value like:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If you are running locally rather than in a GitHub Codespace, leave `VITE_CODESPACE_NAME` unset and the app will use the localhost URL automatically.

## Available routes

- `/` dashboard
- `/users` user overview
- `/teams` team overview
- `/activities` activity log
- `/leaderboard` leaderboard
- `/workouts` workout suggestions
