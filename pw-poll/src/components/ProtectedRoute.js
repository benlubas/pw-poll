import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import UserProvider from "./../providers/UserProvider";

export default function ProtectedRoute(props) {
  const session = useContext(UserProvider.context);
  const hist = useHistory();
  let view = true;
  if (session && session.user) {
    if (props.user === "admin" && !session.admin) {
      view = false;
    } else if (
      props.user === "student" &&
      session.user.email.search("@student.colonialsd.org") === -1 &&
      !session.admin
    ) {
      view = false;
    }
  } else {
    view = false;
  }
  if (!view) hist.push("/");
  return view ? <Route {...props} /> : <div></div>;
}
