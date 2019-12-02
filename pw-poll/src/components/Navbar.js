import React from "react";
import { titlecase } from "../pipes";
import "./navbar.css";

const Navbar = props => {
  return (
    <nav>
      {props.pages.map((value, index) => (
        <div
          style={props.selected === value ? { color: "var(--accent)" } : {}}
          onClick={() => props.set(value)}
        >
          {titlecase(value)}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
