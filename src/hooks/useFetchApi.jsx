import { useEffect, useState } from "react";
import instance from "../service/tmdb";

export const useFetchApi = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await instance.get(url);
        const data = await res?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setHasError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, hasError };
};
