import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Rivers',
        email: 'ada.rivers@example.com',
        fitnessLevel: 'advanced',
        city: 'Seattle',
        weeklyGoal: 6,
        team: 'Velocity Squad',
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        fitnessLevel: 'intermediate',
        city: 'Austin',
        weeklyGoal: 4,
        team: 'Velocity Squad',
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        fitnessLevel: 'advanced',
        city: 'Boston',
        weeklyGoal: 5,
        team: 'Summit Athletes',
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@example.com',
        fitnessLevel: 'beginner',
        city: 'Denver',
        weeklyGoal: 3,
        team: 'Summit Athletes',
      },
    ]);

    const velocityTeam = await Team.create({
      name: 'Velocity Squad',
      description: 'Endurance-focused team tracking weekly cardio goals.',
      captain: users[0]._id,
      memberIds: [users[0]._id, users[1]._id],
      score: 1240,
      streak: 7,
    });

    const summitTeam = await Team.create({
      name: 'Summit Athletes',
      description: 'Strength and mixed-cardio team building consistency.',
      captain: users[2]._id,
      memberIds: [users[2]._id, users[3]._id],
      score: 1185,
      streak: 5,
    });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 42,
        distanceKm: 6.8,
        caloriesBurned: 520,
        date: new Date('2026-08-01T06:15:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        durationMinutes: 35,
        distanceKm: 18.4,
        caloriesBurned: 410,
        date: new Date('2026-08-02T18:30:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 640,
        date: new Date('2026-08-03T17:00:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'Swimming',
        durationMinutes: 30,
        distanceKm: 1.4,
        caloriesBurned: 260,
        date: new Date('2026-08-04T07:10:00Z'),
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { userId: users[0]._id, name: 'Ada Rivers', score: 1420, rank: 1 },
      { userId: users[2]._id, name: 'Priya Shah', score: 1360, rank: 2 },
      { userId: users[1]._id, name: 'Marcus Lee', score: 1280, rank: 3 },
      { userId: users[3]._id, name: 'Noah Kim', score: 1110, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Ladder',
        category: 'Cardio',
        difficulty: 'advanced',
        durationMinutes: 25,
        focusArea: 'conditioning',
        equipment: ['mat', 'timer'],
      },
      {
        title: 'Core Burn Circuit',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 30,
        focusArea: 'core',
        equipment: ['mat', 'dumbbells'],
      },
      {
        title: 'Power Walk Intervals',
        category: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        focusArea: 'cardio',
        equipment: ['water bottle'],
      },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', [velocityTeam.name, summitTeam.name].length);
    console.log('Seeded activities:', 4);
    console.log('Seeded leaderboard entries:', leaderboardEntries.length);
    console.log('Seeded workouts:', 3);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
