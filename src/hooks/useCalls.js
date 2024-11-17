import { useState } from "react"

import { fetchCallDetails, fetchCalls, resetCalls, updateCall } from "../services/calls"

export const useCalls = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCalls = async () => {
    try {
      setLoading(true);
      setError(null);

      const newCalls = await fetchCalls();

      setCalls(newCalls);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const archiveCall = async (id, isArchived) => {
    try {
      setLoading(true);
      setError(null);
    
      const result = await updateCall(id, isArchived);

      if (result.success) {
        setCalls(prevCalls => prevCalls.map(call => call.id === id ? { ...call, is_archived: !isArchived } : call));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };    

  const unArchiveCalls = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await resetCalls();

      if (result.success) {
        setCalls(prevCalls => prevCalls.map(call => ({ ...call, is_archived: false })));
      }  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const archiveCalls = async () => {
    try {
      setLoading(true);
      setError(null);

      setCalls(prevCalls => prevCalls.map(call => ({ ...call, is_archived: true })));
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getCallDetails = async (id) => {
    if (selectedCall && selectedCall.id === id) return;
    
    try {
      setLoading(true);
      setError(null);
  
      const callDetails = await fetchCallDetails(id);
  
      setSelectedCall(callDetails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };  

  return { calls, loading, error, getCalls, archiveCall, unArchiveCalls, archiveCalls, getCallDetails, selectedCall };
};

export default useCalls