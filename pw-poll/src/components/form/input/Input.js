import React, { useState, useRef } from "react";

import "./input.css";

export default function Input(props) {
  const [state, setState] = useState({
    value: props.default === undefined ? "" : props.default,
    focus: false
  });

  return (
    <div
      className={`inputWrapper${
        state.value !== "" || state.focus ? " underline" : ""
      }`}
    >
      <div
        className={`label ${state.focus || state.value !== "" ? "active" : ""}`}
      >
        {props.label === undefined ? "" : props.label}
      </div>
      <input
        className="input"
        value={state.value}
        onFocus={() => setState({ ...state, focus: true })}
        onBlur={() => setState({ ...state, focus: false })}
        onChange={e => {
          setState({ ...state, value: e.target.value });
          props.onChange(state.value);
        }}
        type="text"
      />
    </div>
  );
}
