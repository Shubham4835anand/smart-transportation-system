import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');

        const result = await res.json();
        console.log('API result:', result);

        // Handle different response shapes
        if (Array.isArray(result)) {
          setApiData(result); // ← backend returns [ { tour1 }, { tour2 } ]
        } else if (Array.isArray(result.data)) {
          setApiData(result.data); // ← backend returns { data: [ { tour1 }, ... ] }
        } else {
          throw new Error('Unexpected API format');
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { apiData, error };
};

export default useFetch;
