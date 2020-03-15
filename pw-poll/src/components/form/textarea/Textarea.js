import React, { useState, useRef, useEffect } from "react";

import "./textareaV2.css";

export default function Textarea(props) {
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      let str = ref.current.value;
      let cols = ref.current.cols * 2;
      let linecount = 0;

      str
        .split("\n")
        .forEach(l => (linecount += 1 + Math.floor(l.length / cols)));

      ref.current.rows = linecount;
    }
  }, [ref, props.value]);

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
        ref={ref}
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
