import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { activity } from '../models/Activity.js';
import { leaderboard } from '../models/Leaderboard.js';
import { team } from '../models/Team.js';
import { user } from '../models/User.js';
import { workout } from '../models/Workout.js';
/**
 * Seed the octofit_db database with test data.
 * This replaces existing records in the five OctoFit sample collections.
 */
async function seedDatabase() {
    await connectDatabase();
    try {
        await Promise.all([
            user.deleteMany({}),
            team.deleteMany({}),
            activity.deleteMany({}),
            leaderboard.deleteMany({}),
            workout.deleteMany({}),
        ]);
        const [octocats, codeCubs] = await team.insertMany([
            { name: 'Octocats', description: 'Steady runners who enjoy outdoor miles.' },
            { name: 'Code Cubs', description: 'A friendly team focused on strength and consistency.' },
        ]);
        const [mona, ada, grace, linus] = await user.insertMany([
            {
                username: 'mona',
                displayName: 'Mona',
                email: 'mona@example.com',
                team: octocats._id,
                totalPoints: 420,
            },
            {
                username: 'ada',
                displayName: 'Ada',
                email: 'ada@example.com',
                team: octocats._id,
                totalPoints: 360,
            },
            {
                username: 'grace',
                displayName: 'Grace',
                email: 'grace@example.com',
                team: codeCubs._id,
                totalPoints: 390,
            },
            {
                username: 'linus',
                displayName: 'Linus',
                email: 'linus@example.com',
                team: codeCubs._id,
                totalPoints: 275,
            },
        ]);
        await Promise.all([
            team.updateOne({ _id: octocats._id }, { $set: { members: [mona._id, ada._id] } }),
            team.updateOne({ _id: codeCubs._id }, { $set: { members: [grace._id, linus._id] } }),
        ]);
        await activity.insertMany([
            { user: mona._id, activityType: 'run', durationMinutes: 32, distanceKm: 5.2, calories: 340 },
            { user: ada._id, activityType: 'cycle', durationMinutes: 45, distanceKm: 16, calories: 410 },
            { user: grace._id, activityType: 'strength', durationMinutes: 38, calories: 290 },
            { user: linus._id, activityType: 'walk', durationMinutes: 50, distanceKm: 4.1, calories: 210 },
            { user: mona._id, activityType: 'yoga', durationMinutes: 25, calories: 115 },
        ]);
        await leaderboard.insertMany([
            { period: 'weekly', user: mona._id, team: octocats._id, points: 420, rank: 1 },
            { period: 'weekly', user: grace._id, team: codeCubs._id, points: 390, rank: 2 },
            { period: 'weekly', user: ada._id, team: octocats._id, points: 360, rank: 3 },
            { period: 'weekly', user: linus._id, team: codeCubs._id, points: 275, rank: 4 },
        ]);
        await workout.insertMany([
            {
                name: 'Easy 5K Run',
                description: 'A relaxed run at a conversational pace.',
                category: 'cardio',
                difficulty: 'beginner',
                durationMinutes: 35,
            },
            {
                name: 'Full-body Strength',
                description: 'A balanced bodyweight strength session.',
                category: 'strength',
                difficulty: 'intermediate',
                durationMinutes: 40,
            },
            {
                name: 'Recovery Flow',
                description: 'Gentle mobility and stretching for recovery.',
                category: 'flexibility',
                difficulty: 'beginner',
                durationMinutes: 25,
            },
            {
                name: 'Bike Intervals',
                description: 'Alternating hard efforts with easy recovery periods.',
                category: 'cardio',
                difficulty: 'advanced',
                durationMinutes: 30,
            },
        ]);
        console.log('Database seeding complete.');
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase().catch((error) => {
    console.error('Error seeding octofit_db:', error);
    process.exitCode = 1;
});
