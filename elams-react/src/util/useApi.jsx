import { useState, useCallback } from 'react';
import axios from 'axios'; // Import the base axios instance
// You might still want to import your configured instances if you need to access
// their interceptors or specific base URLs, but for simplicity, we'll use
// the base axios here and add the token dynamically.
// import { employeeAx, shiftAx } from './axios'; // If you've set up separate instances with interceptors

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The 'request' function will be returned by the hook, allowing
  // components to trigger API calls.
  // It takes a function that performs the actual Axios call.
  const request = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    setData(null);  // Clear any previous data

    try {
      // Get the token right before making the request
      const token = localStorage.getItem('token');
      const headers = {
        'Access-Control-Allow-Origin': '*',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Execute the provided API call function, passing the headers
      const response = await apiCall(headers);
      setData(response.data);
      return response.data; // Return data for immediate use if needed
    } catch (err) {
      setError(err);
      throw err; // Re-throw the error so calling components can also catch it
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is memoized once

  return { data, loading, error, request };
};

export default useApi;