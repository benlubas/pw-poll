import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/polls">Polls</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
