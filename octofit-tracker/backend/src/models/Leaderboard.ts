import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    periodStart: { type: Date },
    periodEnd: { type: Date },
  },
  { timestamps: true },
)

export const leaderboard = model('Leaderboard', leaderboardSchema)
