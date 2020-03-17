import { useEffect, useState } from "react";

export const useSecureFetch = url => {
  const [state, setState] = useState([null, true]);
  useEffect(() => {
    const ab = new AbortController();
    setState([null, true]);
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => res.json())
      .then(y => setState([y, false]))
      .catch(err => console.log(err));

    return () => ab.abort();
  }, [url]);
  return state;
};
