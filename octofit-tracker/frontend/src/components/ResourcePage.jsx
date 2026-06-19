import { useEffect, useMemo, useState } from 'react';
import { formatValue, getApiBaseUrl, getResourceApiUrl, normalizeCollectionResponse } from '../lib/api.js';

function getRecordTitle(record, fallbackTitle) {
  const candidates = [record.displayName, record.name, record.type, record.period, record.focus];

  for (const candidate of candidates) {
    const text = formatValue(candidate);
    if (text !== '—') {
      return text;
    }
  }

  return fallbackTitle;
}

function getRecordSubtitle(record) {
  const subtitleParts = [record.email, record.durationMinutes, record.score, record.caloriesBurned]
    .map((value) => formatValue(value))
    .filter((value) => value !== '—');

  return subtitleParts.length > 0 ? subtitleParts.join(' · ') : null;
}

export default function ResourcePage({
  title,
  description,
  resource,
  fields,
  emptyMessage,
  fallbackTitle,
  callout,
}) {
  const [state, setState] = useState({ status: 'loading', items: [], meta: null, error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadResource() {
      setState({ status: 'loading', items: [], meta: null, error: '' });

      try {
        const response = await fetch(getResourceApiUrl(resource), {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const normalized = normalizeCollectionResponse(payload);

        setState({
          status: 'ready',
          items: normalized.items,
          meta: normalized.meta,
          error: '',
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setState({
          status: 'error',
          items: [],
          meta: null,
          error: error instanceof Error ? error.message : 'Failed to load resource',
        });
      }
    }

    void loadResource();

    return () => controller.abort();
  }, [resource]);

  const summaryText = useMemo(() => {
    if (state.status === 'loading') {
      return 'Loading data';
    }

    if (state.status === 'error') {
      return 'Unable to load';
    }

    const total = state.meta?.total ?? state.items.length;
    return `${total} record${total === 1 ? '' : 's'}`;
  }, [state.items.length, state.meta?.total, state.status]);

  return (
    <section className="app-shell resource-shell">
      <div className="panel-card resource-page-card">
        <div className="resource-header">
          <div>
            <p className="eyebrow">API resource</p>
            <h1>{title}</h1>
            <p className="lead">{description}</p>
          </div>
          <div className="resource-metrics">
            <span className="status-pill">{summaryText}</span>
            <span className="status-pill status-pill--soft">{getApiBaseUrl()}</span>
          </div>
        </div>

        {callout ? <div className="alert alert-warning">{callout}</div> : null}

        {state.status === 'error' ? <div className="alert alert-danger">{state.error}</div> : null}

        {state.status === 'loading' ? (
          <div className="loading-state">
            <div className="spinner-border text-info" role="status" aria-label="Loading">
              <span className="visually-hidden">Loading</span>
            </div>
          </div>
        ) : null}

        {state.status === 'ready' && state.items.length === 0 ? (
          <div className="empty-state">
            <h2>{emptyMessage.title}</h2>
            <p>{emptyMessage.body}</p>
          </div>
        ) : null}

        {state.status === 'ready' && state.items.length > 0 ? (
          <div className="resource-grid">
            {state.items.map((record, index) => {
              const key = record?._id ?? record?.id ?? `${resource}-${index}`;
              const titleText = getRecordTitle(record, fallbackTitle);
              const subtitle = getRecordSubtitle(record);

              return (
                <article key={key} className="resource-card">
                  <div className="resource-card-header">
                    <div>
                      <h2>{titleText}</h2>
                      {subtitle ? <p className="resource-subtitle">{subtitle}</p> : null}
                    </div>
                    {record?.createdAt ? <span className="resource-pill">{record.createdAt}</span> : null}
                  </div>

                  <dl className="resource-details">
                    {fields.map((field) => (
                      <div key={field.label} className="resource-detail-row">
                        <dt>{field.label}</dt>
                        <dd>{field.value(record)}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>
        ) : null}

        {state.meta?.page || state.meta?.pages || state.meta?.limit ? (
          <div className="resource-meta-footer">
            {state.meta.page ? <span>Page {state.meta.page}</span> : null}
            {state.meta.pages ? <span>Total pages {state.meta.pages}</span> : null}
            {state.meta.limit ? <span>Page size {state.meta.limit}</span> : null}
            {state.meta.baseUrl ? <span>Source {state.meta.baseUrl}</span> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}