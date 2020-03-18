import React from "react";

import "./selectionBar.css";

export default function SelectionBar({ value, options, ...props }) {
  return (
    <div className="selectionBar">
      {options.map((v, index) => (
        <div
          className={v === value ? "sb-option sb-selected" : "sb-option"}
          onClick={() => props.onChange(v)}
          key={index}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
