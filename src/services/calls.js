export const fetchCalls = async () => {
  const maxRetries = 3;
  const retryDelay = 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch('https://aircall-api.onrender.com/activities');
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await res.json();    

      if (!Array.isArray(data)) {
        throw new Error('API did not return an array');
      }

      return data;
    } catch (error) {
      if (attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed, retrying...`);
        
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        console.error('Max retries reached:', error);
        throw new Error('Failed to fetch calls after multiple attempts');
      }
    }
  }
};

export const updateCall = async (id, isArchived) => {
  try {
    const res = await fetch(`https://aircall-api.onrender.com/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_archived: !isArchived }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update call: ${res.status} ${res.statusText}`);
    }

    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error in updateCall:', error);
    throw new Error('API call failed');
  }
};

export const resetCalls = async () => {
  try {
    const res = await fetch('https://aircall-api.onrender.com/reset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });  

    if (!res.ok) {
      throw new Error(`Failed to unarchive calls: ${res.status} ${res.statusText}`);
    }

    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error in unArchiveCalls:', error);
    throw new Error('API call failed'); 
  }
}

export const fetchCallDetails = async (id) => {
  try {
    const res = await fetch(`https://aircall-api.onrender.com/activities/${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch call details');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching call details:', error);
    throw new Error('API call failed');
  }
};






