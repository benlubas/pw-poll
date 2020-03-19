import React, { useState } from "react";

import { default as DP } from "react-datepicker";
import { default as TP } from "rc-time-picker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import "./datePicker.css";

export function DatePicker({ value, onChange, ...props }) {
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(props.touched || false);
  return (
    <>
      <div className={`dateWrapper ${focus || touched ? "underline" : ""}`}>
        <div className={`dateLabel ${focus || touched ? "dateActive" : ""}`}>
          {props.label}
        </div>
        <DP
          onFocus={() => {
            setFocus(true);
            setTouched(true);
          }}
          onBlur={() => setFocus(false)}
          className={`dateInput ${focus || touched ? "inputActive" : ""}`}
          selected={new Date(value)}
          onChange={val => onChange(val)}
        />
      </div>
    </>
  );
}

export const TimePicker = props => {
  return (
    <div className="dateWrapper">
      <div className="label">{props.label}</div>
      <TP
        className="dateInput"
        showSecond={false}
        defaultValue={moment()
          .hour(0)
          .minute(0)}
        onChange={val => props.onChange(val)}
        format={"h:mm a"}
        use12Hours
        inputReadOnly
      />
    </div>
  );
};
