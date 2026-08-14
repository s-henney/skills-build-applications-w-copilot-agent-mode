import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';
import { apiBaseUrl, PORT } from './server.js';

dotenv.config();

const app: Express = express();
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

const sendCollectionResponse = async (
  _req: Request,
  res: Response,
  model: mongoose.Model<any>,
  routeName: string
) => {
  try {
    const results = await model.find({}).lean();
    res.status(200).json({
      count: results.length,
      route: routeName,
      results,
      apiBaseUrl,
    });
  } catch (error) {
    console.error(`Error fetching ${routeName}:`, error);
    res.status(500).json({ message: `Failed to load ${routeName}` });
  }
};

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'OctoFit Tracker Backend is running',
    apiBaseUrl,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/users', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, User, 'users');
});

app.get('/api/users/', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, User, 'users');
});

app.get('/api/teams', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Team, 'teams');
});

app.get('/api/teams/', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Team, 'teams');
});

app.get('/api/activities', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Activity, 'activities');
});

app.get('/api/activities/', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Activity, 'activities');
});

app.get('/api/leaderboard', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Leaderboard, 'leaderboard');
});

app.get('/api/leaderboard/', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Leaderboard, 'leaderboard');
});

app.get('/api/workouts', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Workout, 'workouts');
});

app.get('/api/workouts/', async (req: Request, res: Response) => {
  await sendCollectionResponse(req, res, Workout, 'workouts');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on ${apiBaseUrl}`);
});

export default app;
