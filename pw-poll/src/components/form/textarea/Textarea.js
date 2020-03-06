import React, { useState } from "react";

// import "./textarea.css"; // Corner swap
import "./textareaV2.css"; //Top and bottom
// import "./textareaV3.css"; //Name on top

export default function Textarea(props) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      style={{ width: props.width || "150px" }}
      className={`taWrapper ${
        props.value !== "" || focus ? "taUnderline" : ""
      }`}
    >
      <div
        className={
          "outlines" + (focus || props.value !== "" ? " taActives" : "")
        }
      >
        <span className="top"></span>
        <span className="left"></span>
        <span className="bottom"></span>
        <span className="right"></span>
        <span></span>
        <span></span>
      </div>
      <div
        className={`taLabel ${focus || props.value !== "" ? "taActive" : ""}`}
      >
        {props.label === undefined ? "" : props.label}
      </div>
      <textarea
        onKeyUp={e => {
          if (props.onEnter !== undefined && e.keyCode === 13) {
            props.onEnter();
          }
          e.preventDefault();
        }}
        className="textarea"
        value={props.value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={e => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
}
