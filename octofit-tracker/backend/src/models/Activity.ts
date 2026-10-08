import { Schema, model } from 'mongoose'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'walk', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export const activity = model('Activity', activitySchema)
