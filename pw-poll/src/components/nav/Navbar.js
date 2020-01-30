import React from "react";
import { titlecase } from "../../pipes";

const Navbar = props => {
  return (
    <nav>
      {props.pages.map((value, index) => (
        <div
          style={props.selected === value ? { color: "var(--blue)" } : {}}
          onClick={() => props.set(value)}
          key={value + index}
        >
          {titlecase(value)}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
