import React, { useState } from "react";

import "./../InputStyle.css";

export default function Input(props) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      style={{ width: props.width || "150px" }}
      className={`input-wrapper${
        props.value !== "" || focus ? " underline" : ""
      }`}
    >
      <div className={`label ${focus || props.value !== "" ? "active" : ""}`}>
        {props.label === undefined ? "" : props.label}
      </div>
      <input
        onKeyUp={e => {
          if (props.onEnter !== undefined && e.keyCode === 13) {
            props.onEnter();
          }
          e.preventDefault();
        }}
        className="input"
        value={props.value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={e => {
          props.onChange(e.target.value);
        }}
        type="text"
      />
    </div>
  );
}
