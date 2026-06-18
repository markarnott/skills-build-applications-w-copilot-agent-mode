import app from './app.js';
import { connectDatabase } from './db.js';
import { getApiBaseUrl } from './config.js';
const port = Number.parseInt(process.env.PORT ?? '8000', 10);
async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on ${getApiBaseUrl(port)}`);
    });
}
void startServer();
