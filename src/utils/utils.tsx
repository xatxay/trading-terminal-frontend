import { useEffect, useState } from "react";

const useFetch = <T,>(
  url: string
): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching: ${response.status}`);
        }
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 2000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [url]);
  return { data, error };
};

export { useFetch };
