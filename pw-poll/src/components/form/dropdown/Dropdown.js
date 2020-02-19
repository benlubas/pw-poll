import React, { useState } from "react";
import "./dropdown.css";

//?  @param values Array
//?  @param value String
//?  @param onChange () => {}
export default function Dropdown(props) {
  const [state, setState] = useState({
    focus: false,
    clicked: false
  });

  return (
    <div
      className={`dropWrapper${
        props.value !== "" || state.focus ? " underline" : ""
      }`}
    >
      <div
        className={`dropLabel ${
          state.focus || props.value !== "" ? "labelActive" : ""
        }`}
      >
        {props.label === undefined ? "" : props.label}
      </div>
      <select
        className={`select ${
          state.focus || props.value !== "" ? "selectActive" : ""
        }`}
        onFocus={() => setState({ focus: true, clicked: true })}
        onBlur={() => setState({ ...state, focus: false })}
        onChange={e => {
          props.onChange(e.target.value);
        }}
        type="text"
      >
        {!state.clicked ? <option value="-1"></option> : null}
        {props.values.map((val, i) => (
          <option key={val + i} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
