import { useEffect, useState } from "react";

export const useFetch = (url, updater) => {
  const [state, setState] = useState({ data: null, loading: true });
  useEffect(() => {
    setState({ data: null, loading: true });
    fetch(url)
      .then(x => x.json())
      .then(y => setState({ data: y, loading: false }))
      .catch(err => console.log(err));
  }, [url, updater]);

  return state;
};
