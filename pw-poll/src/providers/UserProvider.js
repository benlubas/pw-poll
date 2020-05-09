import React, { createContext, useEffect, useState } from "react";
import { url } from "./../url";

const context = createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(url + "auth/user", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (
          res.user &&
          (res.user.email.search("@staff.colonialsd.org") !== -1 ||
            res.user.email === "benmlubas@gmail.com")
        ) {
          res.admin = true;
        } else {
          res.admin = false;
        }
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <context.Provider value={user}>
      {user !== null ? props.children : null}
    </context.Provider>
  );
}

UserProvider.context = context;

export default UserProvider;
