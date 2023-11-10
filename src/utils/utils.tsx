import { useEffect, useState } from "react";
import { Positions } from "./interface";

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
    const intervalId = setInterval(fetchData, 20000000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [url]);
  return { data, error };
};

const useGetPosition = () => {
  return useFetch<Positions[]>("http://localhost:5000/positions");
};

export { useFetch, useGetPosition };
