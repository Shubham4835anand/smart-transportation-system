import { useEffect, useState } from 'react';

const useFetch = (url, options = {}) => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch');
        setApiData(data.data); // 👈 make sure it's data.data if your backend wraps response like { data: {...} }
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { apiData, error };
};

export default useFetch;
