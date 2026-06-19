import ResourcePage from './ResourcePage.jsx';
import { formatDateTime, formatValue } from '../lib/api.js';

export default function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Review workout templates and training focus areas for each routine."
      resource="workouts"
      fallbackTitle="Workout"
      emptyMessage={{
        title: 'No workouts yet',
        body: 'Workout documents from the backend appear here once data is available.',
      }}
      callout="The API URL is derived from import.meta.env.VITE_CODESPACE_NAME and falls back safely."
      fields={[
        { label: 'Focus', value: (record) => formatValue(record.focus) },
        { label: 'Difficulty', value: (record) => formatValue(record.difficulty) },
        { label: 'Updated', value: (record) => formatDateTime(record.updatedAt ?? record.createdAt) },
      ]}
    />
  );
}