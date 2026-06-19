import ResourcePage from './ResourcePage.jsx';
import { formatDateTime, formatValue } from '../lib/api.js';

export default function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="See ranked users and their scores for the current fitness period."
      resource="leaderboard"
      fallbackTitle="Leaderboard entry"
      emptyMessage={{
        title: 'No leaderboard entries yet',
        body: 'Add score records in the backend to populate the ranking table.',
      }}
      callout="Paginated leaderboard responses and plain arrays both render with the same card layout."
      fields={[
        { label: 'User', value: (record) => formatValue(record.userId) },
        { label: 'Score', value: (record) => formatValue(record.score) },
        { label: 'Period', value: (record) => formatValue(record.period) },
        { label: 'Updated', value: (record) => formatDateTime(record.updatedAt ?? record.createdAt) },
      ]}
    />
  );
}