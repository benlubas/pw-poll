import React, { useState } from "react";

import "./checkbox.css";

export default function Checkbox(props) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="checkWrapper">
      <label htmlFor={props.checkVal} className="checkLabel">
        {props.label}
      </label>
      <input // this is here for accessability.
        className="checkboxInput"
        id={props.checkVal}
        value={props.checkVal}
        type="checkbox"
      />
      <div
        onClick={() => {
          props.onChange(!clicked);
          setClicked(!clicked);
        }}
        className={`checkbox ${clicked ? "checkFilled" : ""}`}
      ></div>
    </div>
  );
}
