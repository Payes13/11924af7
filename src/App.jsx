import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect } from 'react';

import ActivityFeed from './components/ActivityFeed';
import ActivityDetail from './components/ActivityDetail';
import useCalls from './hooks/useCalls';
import './App.css';

function App() {
  const { calls, loading, error, getCalls, archiveCall, unArchiveCalls, archiveCalls, getCallDetails, selectedCall } = useCalls();

  useEffect(() => {
    getCalls();
  }, []);

  const activeCalls = calls.filter(call => !call.is_archived);
  const archivedCalls = calls.filter(call => call.is_archived);

  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <Link to="/" className="logo">
              <h3>Aircall</h3>
            </Link>

            <ul>
              <li>
                <Link to="/">Activity Feed</Link>
              </li>
              <li>
                <Link to="/archived">Archived Calls</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          {loading ? (
            <p>Loading calls... Please wait a moment while we fetch the data.</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <section>
                    <button onClick={archiveCalls} className="btn-archive-all">
                      Archive all calls
                    </button>
                    {activeCalls.length > 0 ? (
                      activeCalls.map(call => (
                        <ActivityFeed
                          key={call.id}
                          call={call}
                          handleClick={archiveCall}
                        />
                      ))
                    ) : (
                      <p>No active calls available</p>
                    )}
                  </section>
                }
              />
              <Route
                path="/archived"
                element={
                  <section>
                    <button onClick={unArchiveCalls} className="btn-archive-all">
                      Unarchive all calls
                    </button>
                    {archivedCalls.length > 0 ? (
                      archivedCalls.map(call => (
                        <ActivityFeed
                          key={call.id}
                          call={call}
                          handleClick={archiveCall}
                        />
                      ))
                    ) : (
                      <p>No archived calls available</p>
                    )}
                  </section>
                }
              />
              <Route 
                path="/calls/:callId" 
                element={<ActivityDetail getCallDetails={getCallDetails} selectedCall={selectedCall} loading={loading} error={error} />} 
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
