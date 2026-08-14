import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(getApiBaseUrl('api/activities/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container py-4">Loading activities...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div className="list-group-item" key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
            <div className="d-flex justify-content-between align-items-center">
              <strong>{activity.type}</strong>
              <span className="badge bg-primary">{activity.durationMinutes || activity.duration || 0} min</span>
            </div>
            <div className="mt-2 small text-muted">
              {activity.date ? new Date(activity.date).toLocaleDateString() : 'No date'}
              {activity.distanceKm ? ` • ${activity.distanceKm} km` : ''}
              {activity.caloriesBurned ? ` • ${activity.caloriesBurned} cal` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
