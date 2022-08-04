import { useState, useEffect } from "react";

export const useApi = (url, method = "GET", body = null, headers = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      method,
      body,
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        setFetchedData(json);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        throw err;
      });
  }, [url, method, body, headers]);

  // const clearError = () => {
  //   setError(null);
  // };

  return { isLoading, fetchedData };
};
