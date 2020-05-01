import React, { useState } from "react";

import { default as DP } from "react-datepicker";
import { default as TP } from "rc-time-picker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import "./datePicker.css";
import "./timePicker.css";
import "./../InputStyle.css";

export function DatePicker({ value, onChange, label, ...props }) {
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(props.touched || false);
  return (
    <>
      <div className={`input-wrapper ${focus || touched ? "underline" : ""}`}>
        <div className={`label ${focus || touched ? "active" : ""}`}>
          {label}
        </div>
        <DP
          {...props}
          onFocus={() => {
            setFocus(true);
            setTouched(true);
          }}
          onBlur={() => setFocus(false)}
          className={`input ${!focus && !touched ? "hide-until-clicked" : ""}`}
          selected={new Date(value)}
          onChange={(val) => onChange(val)}
        />
      </div>
    </>
  );
}

export const TimePicker = ({ value, onChange, label, ...props }) => {
  let pass;
  if (value instanceof Date) {
    pass = moment(value.getTime());
  } else pass = value;

  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(props.touched || false);

  return (
    <div className={`input-wrapper ${focus || touched ? "underline" : ""}`}>
      <div className={`label ${focus || touched ? "active" : ""}`}>{label}</div>
      <TP
        {...props}
        className={`tinput ${!focus && !touched ? "thide-until-clicked" : ""}`}
        showSecond={false}
        value={pass}
        defaultValue={moment().hour(0).minute(0)}
        onChange={(val) => onChange(val)}
        format={"h:mm a"}
        use12Hours
        minuteStep={15}
        inputReadOnly
        onFocus={() => {
          setFocus(true);
          setTouched(true);
        }}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};
