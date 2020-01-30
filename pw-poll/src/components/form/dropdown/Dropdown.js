import React, { useState, useRef } from "react";
import { useHov } from "./../../../hooks/useHov";

export default function Dropdown(props) {
  const [value, setValue] = useState(
    props.initialVal === undefined ? "Chose a Value" : props.initialVal
  );
  const onUpdate = props.onUpdate;
  const ref = useRef(null);

  return (
    <div className="dropdown">
      <button
        onClick={e => {
          e.preventDefault();
          ref.current.style.display =
            ref.current.style.display === "inline-block"
              ? "none"
              : "inline-block";
        }}
        className="dropbtn"
      >
        {value}
      </button>
      <div ref={ref} className="content">
        {props.values.map((val, index) => (
          <span
            onClick={() => {
              setValue(val);
              onUpdate(val);
              ref.current.style.display = "none";
            }}
            key={val + index}
          >
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
