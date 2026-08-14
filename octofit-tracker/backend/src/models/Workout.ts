import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusArea: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    equipment: [{ type: String }],
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
