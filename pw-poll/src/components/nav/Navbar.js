import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { titlecase } from "../../pipes";
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
      <div className="links">
        {pages.map((value, index) => (
          <Link
            to={value.link}
            style={selected === value.text ? { color: "var(--primary)" } : {}}
            key={value + index}
          >
            {titlecase(value.text)}
          </Link>
        ))}
      </div>
      {session.success ? <Logout /> : <Login />}
    </nav>
  );
};

export default Navbar;
