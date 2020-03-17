import React, { useContext } from "react";
import StudentHome from "./StudentHome";
import AdminHome from "./AdminHome";
import Login from "./../login/Login";
import UserProvider from "./../../../providers/UserProvider";

const HomePage = () => {
  const session = useContext(UserProvider.context);
  let view = "login";
  if (session !== null && session.success) {
    if (
      session.user.email.search("@staff.colonialsd.org") !== -1 ||
      session.user.email === "benmlubas@gmail.com"
    ) {
      view = "admin";
    } else if (session.user.email.search("@student.colonialsd.org") !== -1) {
      view = "student";
    }
  }

  return view === "student" ? (
    <StudentHome />
  ) : view === "admin" ? (
    <AdminHome />
  ) : (
    <Login />
  );
};
export default HomePage;
