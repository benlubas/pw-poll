import React from "react";

import "./radioGroup.css";

export default function RadioGroup(props) {
  return (
    <div className="radioGroupWrapper">
      <div className="radioPropmpt">{props.propmpt}</div>
      {props.options.map((v, i) => (
        <Radio
          key={v + i}
          checked={props.value === v}
          value={v}
          onChange={newVal => {
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
      <div className={`radio ${props.checked ? "radioFilled" : ""}`}></div>
      <input className="accesRadio" name={props.name} type="radio"></input>
      <label>{props.label}</label>
    </div>
  );
}
