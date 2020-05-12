import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./../Logo";
import UserProvider from "./../../providers/UserProvider";

import { Logout } from "./../googleButtons/GoogleButtons";
import { useHov } from "./../../hooks/useHov";

import {
  PeopleIcon,
  PieChartIcon,
  LogoutIcon,
  PollsIcon,
  QuestionMarkIcon,
  SingleRightArrow,
  ColunmsIcon,
} from "./../svg";

import "./sideNav.css";
import ThemeToggle from "../ThemeToggle";

export default function SideNav() {
  const session = useContext(UserProvider.context);
  const width = window.innerWidth;

  const [ref, hov] = useHov();
  const [touched, setTouched] = useState(false);
  // console.log("hov: ", hov, "touched: ", touched);

  return session.success ? (
    <>
      {touched ? (
        <div
          onTouchEnd={() => setTouched(false)}
          className="mobile-nav-click"
        ></div>
      ) : null}
      <nav
        id="side-nav"
        className={
          (hov && width > 600) || (touched && width <= 600) ? "hov" : ""
        }
        ref={ref}
      >
        <div className="nav-items">
          <div
            onTouchEnd={(e) => {
              if (!touched) e.preventDefault();
              setTouched(!touched);
            }}
            className="nav-item logo-item"
          >
            <Link className="nav-link" to="/">
              <div className="icon">
                <Logo />
              </div>
              <div className="text">POLL W</div>
              <SingleRightArrow
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setTouched(!touched);
                }}
                className="arrows"
              />
              <ThemeToggle nav />
            </Link>
          </div>
          {session.admin ? (
            <>
              <div
                onClick={(e) => {
                  if (!touched) e.preventDefault();
                  setTouched(!touched);
                }}
                className="nav-item"
              >
                <NavLink
                  activeClassName="nav-selected"
                  className="nav-link"
                  to="/polls"
                >
                  <div className="icon">
                    <PollsIcon />
                  </div>
                  <div className="text">Polls</div>
                </NavLink>
              </div>
              <div
                onClick={(e) => {
                  if (!touched) e.preventDefault();
                  setTouched(!touched);
                }}
                className="nav-item"
              >
                <NavLink
                  activeClassName="nav-selected"
                  className="nav-link"
                  to={"/studentView/" + new Date().getFullYear()}
                  isActive={(match, location) =>
                    match || location.pathname.match(/studentView/g)
                  }
                >
                  <div className="icon">
                    <PeopleIcon />
                  </div>
                  <div className="text">Student View</div>
                </NavLink>
              </div>
              <div
                onClick={(e) => {
                  if (!touched) e.preventDefault();
                  setTouched(!touched);
                }}
                className="nav-item"
              >
                <NavLink
                  activeClassName="nav-selected"
                  className="nav-link"
                  to={"/results/select"}
                  isActive={(match, location) => {
                    if (match) return true;
                    if (location.pathname.match(/results/g)) return true;
                  }}
                >
                  <div className="icon">
                    <PieChartIcon />
                  </div>
                  <div className="text">Results</div>
                </NavLink>
              </div>
              <div
                onClick={(e) => {
                  if (!touched) e.preventDefault();
                  setTouched(!touched);
                }}
                className="nav-item"
              >
                <NavLink
                  activeClassName="nav-selected"
                  className="nav-link"
                  to={"/controlPanel"}
                >
                  <div className="icon">
                    <ColunmsIcon />
                  </div>
                  <div className="text">Control Panel</div>
                </NavLink>
              </div>
            </>
          ) : (
            <div
              onClick={(e) => {
                if (!touched) e.preventDefault();
                setTouched(!touched);
              }}
              className="nav-item"
            >
              <NavLink
                to="/about"
                className="nav-link"
                activeClassName="nav-selected"
              >
                <div className="icon">
                  <QuestionMarkIcon />
                </div>
                <div className="text">About</div>
              </NavLink>
            </div>
          )}
          <div className="nav-item">
            <Logout className="nav-link">
              <div className="icon">
                <LogoutIcon />
              </div>
              <div className="text">Logout</div>
            </Logout>
          </div>
        </div>
      </nav>
    </>
  ) : null;
}
