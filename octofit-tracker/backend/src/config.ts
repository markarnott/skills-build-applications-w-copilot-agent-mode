export function getApiBaseUrl(port = Number.parseInt(process.env.PORT ?? '8000', 10)) {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}