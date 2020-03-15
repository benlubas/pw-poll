import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import "./App.css";
// import HomePage from "./components/pages/HomePage";
import PollsPage from "./components/pages/PollsPage";
// import TestDB from "./components/pages/testDB";
import HomePage from "./components/pages/home/HomePage";
// import Groups from "./components/pages/Groups";
// import AddPoll from "./components/pages/add/AddPoll";
import StudentViewPoll from "./components/pages/StudentViewPoll";
import UserProvider from "./providers/UserProvider";

function App() {
  const pages = [
    { text: "home", link: "/" },
    { text: "polls", link: "/polls" },
    { text: "vote", link: "/vote" }
  ];

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Navbar pages={pages}></Navbar>
          <Switch>
            <Route exact path={"/"}>
              <HomePage />
            </Route>
            <Route exact path={"/polls"}>
              <PollsPage />
            </Route>
            <Route exact path={"/vote/"}>
              <StudentViewPoll />
            </Route>
            <Route path={"/"}>
              <h1>404: Page Not Found</h1>
            </Route>
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
