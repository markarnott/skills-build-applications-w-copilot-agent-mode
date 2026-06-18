import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0 },
    period: { type: String, required: true, trim: true },
}, { timestamps: true });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
