import { useCallback, useEffect, useState } from "react";
import tmdbInstance from "../service/tmdb/tmdb";
import omdbInstance from "../service/omdb/omdb";

export const useFetchApi = (url, requestFrom) => {
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [hasError, setHasError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${requestFrom}:${url}:${attempt}`;
  const [activeRequestKey, setActiveRequestKey] = useState(requestKey);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    setActiveRequestKey(requestKey);
    if (!url || url.includes("undefined")) {
      setIsLoading(false);
      setApiData(null);
      setHasError(null);
      return;
    }

    setIsLoading(true);
    setHasError(null);
    setApiData(null);
    const controller = new AbortController();
    let isCancelled = false;

    const fetchData = async () => {
      try {
        let res;
        if (requestFrom === "tmdb") {
          res = await tmdbInstance.get(url, { signal: controller.signal });
        } else if (requestFrom === "omdb") {
          res = await omdbInstance.get(url, { signal: controller.signal });
        } else {
          throw new Error("Unknown API source");
        }

        const data = res?.data;

        if (!isCancelled) {
          setApiData(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setHasError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [url, requestFrom, requestKey]);

  // Do not expose the previous page's data during the render before the effect runs.
  if (activeRequestKey !== requestKey) {
    return { isLoading: Boolean(url && !url.includes("undefined")), apiData: null, hasError: null, retry };
  }
  return { isLoading, apiData, hasError, retry };
};
