import React from "react";

import "./radioGroup.css";

export default function RadioGroup(props) {
  const choose = parseInt(props.choose) || 1;
  const optionValues = props.optionValues || props.options;
  return (
    <div className="radioGroupWrapper">
      <div className="radioPropmpt">{props.propmpt}</div>
      {props.options.map((v, i) => (
        <Radio
          key={v + i}
          checked={
            optionValues[i] === props.value ||
            (props.value && props.value.includes(optionValues[i]))
          }
          value={optionValues[i]}
          square={props.options.length === choose}
          onChange={newVal => {
            if (choose === 1) {
              props.onChange(newVal);
            } else {
              let v = [...props.value];
              if (v.includes(newVal)) {
                v.splice(v.indexOf(newVal), 1);
              } else {
                if (v.length < choose) {
                  v.push(newVal);
                } else {
                  v.shift();
                  v.push(newVal);
                }
              }
              props.onChange(v);
            }
          }}
          label={v}
          name={props.name}
          inline={props.inline}
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
      className={`radioBtnWrapper`}
      style={props.inline ? { display: "inline-flex" } : {}}
    >
      <div
        className={`${props.square ? "checkbox" : "radio"} ${
          props.checked && props.square
            ? "checkFilled"
            : props.checked
            ? "radioFilled"
            : ""
        }`}
      ></div>
      <label>{props.label}</label>
    </div>
  );
}
