import { useState } from "react";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const sendRequest = (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);
    fetch(url, {
      method,
      body,
      headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        setFetchedData(json);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };
  return { isLoading, fetchedData, sendRequest };
};
