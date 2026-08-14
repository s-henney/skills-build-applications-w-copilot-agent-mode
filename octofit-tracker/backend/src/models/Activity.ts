import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
