import React from "react";
import { Router, Link } from "react-router-dom";
import { titlecase } from "../../pipes";
import Logo from "./../Logo";

import "./navbar.css";

const Navbar = ({ pages, selected }) => {
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
    </nav>
  );
};

export default Navbar;
