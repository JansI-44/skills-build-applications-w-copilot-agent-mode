import express from 'express';
import { connectDatabase } from './config/database.js';
import { activity } from './models/Activity.js';
import { leaderboard } from './models/Leaderboard.js';
import { team } from './models/Team.js';
import { user } from './models/User.js';
import { workout } from './models/Workout.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.get('/api/users/', async (_request, response) => {
    response.json(await user.find().lean().exec());
});
app.get('/api/teams/', async (_request, response) => {
    response.json(await team.find().populate('members', 'username displayName').lean().exec());
});
app.get('/api/activities/', async (_request, response) => {
    response.json(await activity.find().populate('user', 'username displayName').lean().exec());
});
app.get('/api/leaderboard/', async (_request, response) => {
    response.json(await leaderboard
        .find()
        .populate('user', 'username displayName')
        .populate('team', 'name')
        .sort({ period: 1, rank: 1 })
        .lean()
        .exec());
});
app.get('/api/workouts/', async (_request, response) => {
    response.json(await workout.find().lean().exec());
});
const handleError = (error, _request, response, _next) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'An unexpected server error occurred.' });
};
app.use(handleError);
async function startServer() {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit API listening at ${apiBaseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
});
