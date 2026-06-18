import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
