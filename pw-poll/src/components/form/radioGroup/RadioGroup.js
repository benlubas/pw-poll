import React, { useState } from "react";

import "./radioGroup.css";

export default function RadioGroup(props) {
  const [val, setVal] = useState(props.val);
  return (
    <div className="radioGroupWrapper">
      <div className="radioPropmpt">{props.propmpt}</div>
      {props.options.map((v, i) => (
        <Radio
          key={v + i}
          checked={val === v}
          value={v}
          onChange={newVal => {
            setVal(newVal);
            props.onChange(newVal);
          }}
          label={v}
          name={props.name}
        />
      ))}
    </div>
  );
}

export function Radio(props) {
  return (
    <div
      onClick={() => {
        props.onChange(props.value);
      }}
      className="radioBtnWrapper"
    >
      <label>{props.label}</label>
      <div className={`radio ${props.checked ? "radioFilled" : ""}`}></div>
      <input className="accesRadio" name={props.name} type="radio"></input>
    </div>
  );
}
