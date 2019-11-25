import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const PollsPage = () => {
  const { data, loading } = useFetch("http://localhost:5000/polls");

  return <pre>{loading ? "loading..." : JSON.stringify(data, null, 2)}</pre>;
};

export default PollsPage;
