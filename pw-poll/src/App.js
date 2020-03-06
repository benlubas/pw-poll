import React, { useState } from "react";
// import { Router, Link, Route } from "react-router";
import Navbar from "./components/nav/Navbar";
import "./App.css";
// import HomePage from "./components/pages/HomePage";
import PollsPage from "./components/pages/PollsPage";
import TestDB from "./components/pages/testDB";
import HomePage from "./components/pages/HomePage";
import Groups from "./components/pages/Groups";
import AddPoll from "./components/pages/addPoll/AddPoll";
import StudentViewPoll from "./components/pages/StudentViewPoll";

function App() {
  const [page, setPage] = useState("polls");
  const pages = ["home", "polls", "studViewPoll", "test", "groups", "add poll"];

  return (
    <>
      <Navbar selected={page} pages={pages} set={setPage} />
      {page === "polls" ? (
        <PollsPage />
      ) : page === "test" ? (
        <TestDB />
      ) : page === "home" ? (
        <HomePage />
      ) : page === "groups" ? (
        <Groups />
      ) : page === "add poll" ? (
        <AddPoll />
      ) : page === "studViewPoll" ? (
        <StudentViewPoll pollID="5e53de81de875a0587536eeb" />
      ) : (
        <div>no page "{page}" found</div>
      )}
    </>
  );
}

export default App;
