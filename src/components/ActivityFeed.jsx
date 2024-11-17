import { Link } from 'react-router-dom';

import './activityFeed.css';

const ActivityFeed = ({ call, handleClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="call-card">
      <h4>from: {call.from}</h4>
      <p>{formatDate(call.created_at)}</p>
      <span className="call-time">{formatTime(call.created_at)}</span>
      <p>Status: {call.is_archived ? 'Archived' : 'Active'}</p>

      <button onClick={() => handleClick(call.id, call.is_archived)}>
        {call.is_archived ? 'Unarchive' : 'Archive'}
      </button>
      
      <Link to={`/calls/${call.id}`} className="btn-details">
        View Details
      </Link>
    </div>
  );
};

export default ActivityFeed;
