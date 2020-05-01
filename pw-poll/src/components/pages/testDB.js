import React from "react";

import { useFetch } from "./../../hooks/useFetch";

const TestDB = () => {
  const [data, loading] = useFetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList"
  );
  return <pre>{JSON.stringify(data)}</pre>;
};

export default TestDB;
