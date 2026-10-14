import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ['cardio', 'strength', 'flexibility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    suggestedFor: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export const workout = model('Workout', workoutSchema);
