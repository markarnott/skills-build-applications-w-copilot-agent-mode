import mongoose from 'mongoose';
export async function connectDatabase() {
    const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    return mongoose.connect(mongoUri);
}
