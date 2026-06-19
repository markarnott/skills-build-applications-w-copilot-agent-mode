import app from './app.js';
import { connectDatabase } from './config/database.js';
import { pathToFileURL } from 'node:url';

export const API_PORT = 8000;

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-${API_PORT}.app.github.dev`
    : `http://localhost:${API_PORT}`;
}

async function startServer() {
  await connectDatabase();
  app.listen(API_PORT, () => {
    console.log(`OctoFit Tracker API listening on ${getApiBaseUrl()}`);
  });
}

const isDirectExecution =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  void startServer();
}
