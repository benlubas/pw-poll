import React, { useState } from "react";
// import { Router, Link, Route } from "react-router";
import Navbar from "./components/nav/Navbar";
import "./App.css";
// import HomePage from "./components/pages/HomePage";
import PollsPage from "./components/pages/PollsPage";
import TestDB from "./components/pages/testDB";
import HomePage from "./components/pages/HomePage";

function App() {
  const [page, setPage] = useState("test");
  const pages = ["home", "polls", "test"];

  return (
    <>
      <Navbar selected={page} pages={pages} set={setPage} />
      {page === "polls" ? (
        <PollsPage />
      ) : page === "test" ? (
        <TestDB />
      ) : page === "home" ? (
        <HomePage />
      ) : (
        <div>no page "{page}" found</div>
      )}
    </>
  );
}

export default App;
