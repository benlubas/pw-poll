import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import NavLinkParams from "./../NavLinkParams";
// import { titlecase } from "../../pipes";
import Logo from "./../Logo";
import { Login, Logout } from "../googleButtons/GoogleButtons";
import UserProvider from "../../providers/UserProvider";

import "./navbar.css";

const Navbar = ({ pages, selected }) => {
  const session = useContext(UserProvider.context);
  return (
    <nav>
      <Link className="logo" to="/">
        <Logo />
      </Link>
      {session.admin ? (
        <>
          <NavLink
            activeClassName="nav-selected"
            className="navLink"
            to="/polls"
          >
            Create/Edit Poll
          </NavLink>
          <NavLink
            activeClassName="nav-selected"
            className="navLink"
            to={"/studentView/:year" + new Date().getFullYear()}
            isActive={(match, location) => {
              if (match) return true;
              if (location.pathname.match(/studentView/g)) return true;
            }}
          >
            Student View
          </NavLink>
        </>
      ) : null}
      {session.success ? <Logout /> : <Login />}
    </nav>
  );
};

export default Navbar;
