import React, { useState, useContext } from "react";
import StudentHome from "./StudentHome";
import NoUser from "./NoUser";
import UserProvider from "./../../../providers/UserProvider";

const HomePage = props => {
  const session = useContext(UserProvider.context);
  let view = "login";
  if (session !== null && session.success) {
    console.log("HI");
    if (session.user.email.search(/@staff\.colonialsd\.org/) !== -1) {
      view = "teacher";
    } else if (session.user.email.search(/@student\.colonialsd\.org/) !== -1) {
      view = "student";
    }
  }

  return view === "student" ? <StudentHome /> : <NoUser />;
};
export default HomePage;
