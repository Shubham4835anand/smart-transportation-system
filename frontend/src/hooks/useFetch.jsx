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

        setApiData(result);
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
