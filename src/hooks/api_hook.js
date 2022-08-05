import { useState, useEffect } from "react";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState({});
  const sendRequest = (url, method = "GET", body = null, headers = {}) => {
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
  };
  return { isLoading, error, fetchedData, sendRequest };
};
