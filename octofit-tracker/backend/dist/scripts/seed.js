import { connectDatabase } from '../database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard-entry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
// Seed the octofit_db database with test data.
async function seedDatabase() {
    await connectDatabase();
    await Promise.all([
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Team.deleteMany({}),
        User.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const teams = await Team.insertMany([
        { name: 'North Star Knights' },
        { name: 'Velocity Vipers' },
    ]);
    const users = await User.insertMany([
        {
            email: 'maya.chen@example.com',
            displayName: 'Maya Chen',
            teamId: teams[0]._id,
        },
        {
            email: 'jordan.lee@example.com',
            displayName: 'Jordan Lee',
            teamId: teams[0]._id,
        },
        {
            email: 'samir.patel@example.com',
            displayName: 'Samir Patel',
            teamId: teams[1]._id,
        },
    ]);
    await Team.updateOne({ _id: teams[0]._id }, { captainId: users[0]._id });
    await Team.updateOne({ _id: teams[1]._id }, { captainId: users[2]._id });
    await Workout.insertMany([
        { name: 'Sunrise Endurance Ride', focus: 'cardio', difficulty: 'intermediate' },
        { name: 'Core Crusher Circuit', focus: 'strength', difficulty: 'advanced' },
        { name: 'Recovery Flow', focus: 'mobility', difficulty: 'beginner' },
    ]);
    await Activity.insertMany([
        {
            userId: users[0]._id,
            type: 'cycling',
            durationMinutes: 45,
            caloriesBurned: 520,
        },
        {
            userId: users[1]._id,
            type: 'strength training',
            durationMinutes: 55,
            caloriesBurned: 410,
        },
        {
            userId: users[2]._id,
            type: 'mobility',
            durationMinutes: 30,
            caloriesBurned: 180,
        },
    ]);
    await LeaderboardEntry.insertMany([
        {
            userId: users[0]._id,
            score: 1840,
            period: 'weekly',
        },
        {
            userId: users[1]._id,
            score: 1710,
            period: 'weekly',
        },
        {
            userId: users[2]._id,
            score: 1935,
            period: 'weekly',
        },
    ]);
    console.log('Seeded octofit_db with users, teams, activities, leaderboard entries, and workouts.');
}
void seedDatabase()
    .then(() => {
    console.log('Seed complete.');
    process.exit(0);
})
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
