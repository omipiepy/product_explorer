import { useState, useEffect } from "react";

const useFetch = (fetchFn, deps) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    // if deps change before the request finishes, we ignore the old result
    let ignore = false;

    setLoading(true);
    setError(null);

    fetchFn()
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tries]);

  function retry() {
    setTries(tries + 1);
  }

  return { data, loading, error, retry };
}

export default useFetch;