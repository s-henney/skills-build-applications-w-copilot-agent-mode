import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getApiBaseUrl('api/users/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container py-4">Loading users...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id || user.id || user.email}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-1"><strong>Fitness Level:</strong> {user.fitnessLevel || 'N/A'}</p>
                <p className="card-text mb-1"><strong>City:</strong> {user.city || 'N/A'}</p>
                <p className="card-text mb-0"><strong>Team:</strong> {user.team || 'Unassigned'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
