import { useEffect, useState } from "react";

export const useFetch = (url, updater) => {
  const [state, setState] = useState([null, true]);
  useEffect(() => {
    const ab = new AbortController();
    setState([null, true]);
    fetch(url)
      .then(x => x.json())
      .then(y => setState([y, false]))
      .catch(err => console.log(err));

    return () => ab.abort();
  }, [url, updater]);

  return state;
};
