import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './activityDetail.css';

const ActivityDetail = ({ getCallDetails, selectedCall, loading, error }) => {
  const callId = window.location.pathname.split('/').pop(); 

  useEffect(() => {
    if (!selectedCall || selectedCall.id !== callId) {
      getCallDetails(callId);
    }
  }, [callId, selectedCall, getCallDetails]);

  if (loading) {
    return <p>Loading call details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!selectedCall) {
    return <p>No call details available</p>;
  }

  return (
    <div className="call-details">
      <h3>Call Details</h3>
      <p>From: {selectedCall.from}</p>
      <p>To: {selectedCall.to}</p>
      <p>Duration: {selectedCall.duration}</p>
      <p>Archived: {selectedCall.is_archived ? 'Yes' : 'No'}</p>

      <Link to={`/`} className="btn-details">
        Back to Activity Feed
      </Link>
    </div>
  );
};

export default ActivityDetail;
