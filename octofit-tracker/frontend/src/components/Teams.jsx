import ResourcePage from './ResourcePage.jsx';
import { formatDateTime, formatValue } from '../lib/api.js';

export default function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="Organize users into teams and surface captain information."
      resource="teams"
      fallbackTitle="Team"
      emptyMessage={{
        title: 'No teams yet',
        body: 'Create teams in the backend and they will appear here automatically.',
      }}
      callout="The endpoint may return either an array or a paginated envelope; both are supported."
      fields={[
        { label: 'Captain', value: (record) => formatValue(record.captainId) },
        { label: 'Updated', value: (record) => formatDateTime(record.updatedAt ?? record.createdAt) },
      ]}
    />
  );
}