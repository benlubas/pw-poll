import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/nav/Navbar";
import "./App.css";
import PollsPage from "./components/pages/pollsPage/PollsPage";
import HomePage from "./components/pages/home/HomePage";
import StudentViewPoll from "./components/pages/StudentViewPoll";
import UserProvider from "./providers/UserProvider";
import AdminStudentView from "./components/pages/AdminStudentView";
import Results from "./components/pages/results/Results.js";

import TestPage from "./components/TestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Switch>
            <Route path="/test" component={TestPage} />
            <Route exact path={"/"} component={HomePage} />
            <ProtectedRoute
              component={PollsPage}
              user="admin"
              exact
              path={"/polls"}
            />
            <ProtectedRoute
              user="student"
              component={StudentViewPoll}
              exact
              path={"/vote/:id"}
            />
            <ProtectedRoute
              component={AdminStudentView}
              user="admin"
              exact
              path="/studentView/:year"
            />
            <ProtectedRoute
              component={Results}
              user="admin"
              exact
              path="/results/:pollID"
            />

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
