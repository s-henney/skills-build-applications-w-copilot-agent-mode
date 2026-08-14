import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(getApiBaseUrl('-8000.app.github.dev/api/leaderboard/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setLeaderboard(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container py-4">Loading leaderboard...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <div className="list-group">
        {leaderboard.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.name}>
            <div>
              <strong>#{entry.rank ?? 1}</strong> {entry.name}
            </div>
            <span className="badge bg-success rounded-pill">{entry.score ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
