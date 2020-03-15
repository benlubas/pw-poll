import React, { createContext, useEffect, useState } from "react";
import { url } from "./../url";

const context = createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(url + "auth/login", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(err => console.log(err));
  }, []);
  console.log("user: ", user);
  return <context.Provider value={user}>{props.children}</context.Provider>;
}

UserProvider.context = context;

export default UserProvider;
