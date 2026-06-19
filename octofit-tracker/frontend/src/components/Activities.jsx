import ResourcePage from './ResourcePage.jsx';
import { formatDateTime, formatValue } from '../lib/api.js';

export default function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Track completed workouts, durations, and calories burned across users."
      resource="activities"
      fallbackTitle="Activity"
      emptyMessage={{
        title: 'No activities yet',
        body: 'Once the backend has activity records, they appear here with duration and calories.',
      }}
      callout="Activity payloads can arrive as arrays or paginated objects, and the UI normalizes both."
      fields={[
        { label: 'User', value: (record) => formatValue(record.userId) },
        { label: 'Type', value: (record) => formatValue(record.type) },
        { label: 'Duration', value: (record) => `${formatValue(record.durationMinutes)} min` },
        { label: 'Calories', value: (record) => `${formatValue(record.caloriesBurned)} kcal` },
        { label: 'Updated', value: (record) => formatDateTime(record.updatedAt ?? record.createdAt) },
      ]}
    />
  );
}