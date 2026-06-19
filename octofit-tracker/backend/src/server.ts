import app from './app.js';
import { connectDatabase } from './config/database.js';
import { pathToFileURL } from 'node:url';

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:8000`;
}

async function startServer() {
  await connectDatabase();
  app.listen(8000, () => {
    console.log(`OctoFit Tracker API listening on ${getApiBaseUrl()}`);
  });
}

const isDirectExecution =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  void startServer();
}
