import React, { useState } from "react";

import "./../InputStyle.css";

export default function Input({
  width,
  label,
  value,
  onEnter,
  onChange,
  style,
  ...props
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      {...props}
      style={{ width: width || "150px", ...style }}
      className={`input-wrapper${value !== "" || focus ? " underline" : ""}`}
    >
      <div className={`label ${focus || value !== "" ? "active" : ""}`}>
        {label === undefined ? "" : label}
      </div>
      <input
        onKeyUp={(e) => {
          if (onEnter !== undefined && e.keyCode === 13) {
            onEnter();
          }
          e.preventDefault();
        }}
        className="input"
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
      />
    </div>
  );
}
