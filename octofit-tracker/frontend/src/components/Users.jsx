import ResourcePage from './ResourcePage.jsx';
import { formatDateTime, formatValue } from '../lib/api.js';

export default function Users() {
  return (
    <ResourcePage
      title="Users"
      description="Browse member profiles and the team assignments associated with each account."
      resource="users"
      fallbackTitle="User"
      emptyMessage={{
        title: 'No users yet',
        body: 'User documents from the backend will be displayed here once seeded.',
      }}
      callout="Define VITE_CODESPACE_NAME in .env.local so the frontend can resolve the API host."
      fields={[
        { label: 'Email', value: (record) => formatValue(record.email) },
        { label: 'Team', value: (record) => formatValue(record.teamId) },
        { label: 'Updated', value: (record) => formatDateTime(record.updatedAt ?? record.createdAt) },
      ]}
    />
  );
}