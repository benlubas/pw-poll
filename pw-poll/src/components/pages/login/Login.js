import React, { useState } from "react";

import Logo from "./../../Logo";

import { Login } from "./../../googleButtons/GoogleButtons";
import ThemeToggle from "../../ThemeToggle";

export default function LoginPage() {
  const [ee, setEe] = useState({ tl: false, tr: false, br: false, bl: false });
  const [state, setState] = useState("waiting");
  const check = () => {
    return ee.tl && ee.tr && ee.br && ee.bl;
  };
  return (
    <div className="flex-center login-page-wrapper">
      <div className="login-card">
        <div
          onClick={() => setEe({ ...ee, tr: true })}
          className="login-target"
        ></div>
        <div
          onClick={() => setEe({ ...ee, tl: true })}
          className="login-target"
        ></div>
        <div
          onClick={() => setEe({ ...ee, br: true })}
          className="login-target"
        ></div>
        <div
          onClick={() => setEe({ ...ee, bl: true })}
          className="login-target"
        ></div>
        {state === "W" ? (
          <div
            onClick={() => setState("CLICKED")}
            className="login-ee-final"
          ></div>
        ) : state === "CLICKED" || state === "Y" || state === "E" ? (
          <div>
            Good Job. Do <span onClick={() => setState("Y")}>y</span>ou want to
            k
            <span
              onClick={() => {
                if (state === "Y") setState("E");
              }}
            >
              ee
            </span>
            p going,{" "}
            <span
              onClick={() => {
                if (state === "E") setState("S");
              }}
            >
              s
            </span>
            on?
          </div>
        ) : state === "S" ? (
          <>
            <div style={{ textAlign: "center" }}>
              There is a singular pixel to click now. Good Luck and remember,
              inspect element is cheating.
            </div>
            <div onClick={() => setState("DONE")} className="-nav-bar"></div>
          </>
        ) : state === "DONE" ? (
          <div>Hope you've enjoyed the challenge</div>
        ) : null}
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "300",
            marginBottom: "0px",
            textAlign: "center",
          }}
        >
          Welcome To{" "}
          {check() ? (
            <span>
              Poll <span onClick={() => setState("W")}>W</span>
            </span>
          ) : (
            "PW Voting"
          )}
          !
        </div>
        <ThemeToggle>
          <div style={{ marginBottom: "50px" }}>
            <Logo width="170" height="170" />
          </div>
        </ThemeToggle>
        {/* <div className="big-text">Please Sign In</div> */}
        <Login />
      </div>
    </div>
  );
}
