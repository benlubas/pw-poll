import React from "react";

import Logo from "./../../Logo";

import { Login } from "./../../googleButtons/GoogleButtons";

export default function LoginPage() {
  return (
    <div className="flex-center login-page-wrapper">
      <div className="login-card">
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "300",
            marginBottom: "0px"
          }}
        >
          Welcome To Poll W!
        </div>
        <div style={{ marginBottom: "50px" }}>
          <Logo width="170" height="170" />
        </div>
        {/* <div className="big-text">Please Sign In</div> */}
        <Login />
      </div>
    </div>
  );
}
