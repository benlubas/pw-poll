import React from "react";

import "./selectionBar.css";

export default function SelectionBar({
  value,
  options,
  optionValues,
  ...props
}) {
  const values = optionValues || options;
  return (
    <div className="selectionBar">
      {options.map((v, index) => (
        <div
          className={
            values[index] === value ? "sb-option sb-selected" : "sb-option"
          }
          onClick={() => props.onChange(values[index])}
          key={index}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
