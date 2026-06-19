const API_PORT = 8000;

function getCodespaceName() {
  const value = import.meta.env.VITE_CODESPACE_NAME;
  return typeof value === 'string' ? value.trim() : '';
}

export function getApiBaseUrl() {
  const codespaceName = getCodespaceName();
  return codespaceName
    ? `https://${codespaceName}-${API_PORT}.app.github.dev`
    : `http://localhost:${API_PORT}`;
}

export function getResourceApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

function createEmptyMeta() {
  return {
    total: 0,
    page: null,
    pages: null,
    limit: null,
    baseUrl: null,
    resource: null,
  };
}

function buildMeta(payload, fallbackTotal) {
  const totalValue = Number(
    payload.total ?? payload.count ?? payload.totalItems ?? payload.totalCount ?? fallbackTotal,
  );

  return {
    total: Number.isFinite(totalValue) ? totalValue : fallbackTotal,
    page: payload.page ?? payload.currentPage ?? null,
    pages: payload.pages ?? payload.totalPages ?? null,
    limit: payload.limit ?? payload.pageSize ?? null,
    baseUrl: typeof payload.baseUrl === 'string' ? payload.baseUrl : null,
    resource: typeof payload.resource === 'string' ? payload.resource : null,
  };
}

function extractItems(payload) {
  const candidateKeys = ['items', 'data', 'results', 'docs', 'rows', 'entries'];

  for (const key of candidateKeys) {
    const candidate = payload[key];

    if (Array.isArray(candidate)) {
      return { items: candidate, meta: buildMeta(payload, candidate.length) };
    }

    if (candidate && typeof candidate === 'object') {
      const nested = normalizeCollectionResponse(candidate);
      if (nested.items.length > 0 || nested.meta.total > 0) {
        return nested;
      }
    }
  }

  return { items: [], meta: buildMeta(payload, 0) };
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, meta: { ...createEmptyMeta(), total: payload.length } };
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], meta: createEmptyMeta() };
  }

  return extractItems(payload);
}

export function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (Array.isArray(value)) {
    return value.map((entry) => formatValue(entry)).join(', ');
  }

  if (typeof value === 'object') {
    if ('displayName' in value && value.displayName) {
      return String(value.displayName);
    }

    if ('name' in value && value.name) {
      return String(value.name);
    }

    if ('_id' in value && value._id) {
      return String(value._id);
    }

    return JSON.stringify(value);
  }

  return String(value);
}

export function formatDateTime(value) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return formatValue(value);
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}