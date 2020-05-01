import React, { useState } from "react";
import "./dropdown.css";

//?  @param values Array
//?  @param value String
//?  @param onChange () => {}
export default function Dropdown({
  clicked,
  value,
  values,
  options,
  label,
  onChange,
  classes,
  disableFirst,
  ...props
}) {
  const [state, setState] = useState({
    focus: false,
    clicked: props.clicked || false,
  });
  return (
    <div
      {...props}
      className={`dropWrapper ${
        value !== "" || state.clicked ? "underline" : ""
      } ${classes || ""}`}
    >
      <div
        className={`dropLabel ${
          state.clicked || value !== "" ? "labelActive" : ""
        }`}
      >
        {label === undefined ? "" : label}
      </div>
      <select
        className={`select ${
          state.focus || value !== "" ? "selectActive" : ""
        }`}
        onFocus={() => setState({ focus: true, clicked: true })}
        onBlur={() => setState({ ...state, focus: false })}
        onChange={(e) => {
          onChange(
            e.target.value,
            options ? options[values.indexOf(e.target.value)] : false
          );
        }}
        type="text"
      >
        {!state.clicked ? <option value="-1"></option> : null}
        {values.map((val, i) => (
          <option key={val + i} value={val} disabled={disableFirst && i === 0}>
            {options ? options[i] : val}
          </option>
        ))}
      </select>
    </div>
  );
}
