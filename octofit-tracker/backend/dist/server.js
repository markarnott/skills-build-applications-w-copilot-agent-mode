import app from './app.js';
import { connectDatabase } from './config/database.js';
import { API_PORT, getApiBaseUrl } from './config.js';
async function startServer() {
    await connectDatabase();
    app.listen(API_PORT, () => {
        console.log(`OctoFit Tracker API listening on ${getApiBaseUrl()}`);
    });
}
void startServer();
