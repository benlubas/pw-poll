import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/nav/Navbar";
import SideNav from "./components/nav/SideNav";
import "./App.css";
import PollsPage from "./components/pages/pollsPage/PollsPage";
import HomePage from "./components/pages/home/HomePage";
import StudentViewPoll from "./components/pages/StudentViewPoll";
import UserProvider from "./providers/UserProvider";
import AdminStudentView from "./components/pages/AdminStudentView";
import Results from "./components/pages/results/Results.js";
import About from "./components/pages/About.js";
import DevInfo from "./components/pages/DevInfo.js";
import ControlPanel from "./components/pages/controlPanel/ControlPanel";
import InfoPage from "./components/pages/home/InfoPage";
import NotFound from "./components/pages/notFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <SideNav />
          <div className="nav-push-over">
            <Switch>
              {/* <Route path="/test" component={TestPage} /> */}
              <Route exact path={"/"} component={HomePage} />
              <ProtectedRoute
                component={PollsPage}
                user="admin"
                exact
                path={"/polls"}
              />
              <ProtectedRoute
                component={InfoPage}
                user="admin"
                exact
                path={"/info/:label"}
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
              <ProtectedRoute
                component={ControlPanel}
                user="admin"
                exact
                path="/controlPanel"
              />
              <Route path="/about" exact component={About} />
              <Route path="/devInfo" exact component={DevInfo} />

              <Route path={"/"} component={NotFound} />
            </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
