import React, { useContext } from "react";
import { useHistory } from "react-router";
import UserProvider from "./../providers/UserProvider";

export default function ProtectedRoute(props) {
  const session = useContext(UserProvider.context);
  const hist = useHistory();
  let view = true;
  if (session && session.user) {
    if (props.user === "admin" && !session.admin) {
      view = false;
      hist.push("/");
    } else if (
      props.user === "student" &&
      session.user.email.search("@student.colonialsd.org") === -1
    ) {
      view = false;
      hist.push("/");
    }
  } else {
    view = false;
    hist.push("/");
  }
  return view ? (
    props.children
  ) : (
    <div>You don't have access to this page. </div>
  );
}
