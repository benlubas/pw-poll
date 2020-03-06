import React, { useState } from "react";

import "./datePicker.css";

export default function DatePicker(props) {
  const [focus, setFocus] = useState(false);
  const [touched, setTouched] = useState(props.clicked || false);
  return (
    <div className={`dateWrapper ${focus || touched ? "underline" : ""}`}>
      <div className={`dateLabel ${focus || touched ? "dateActive" : ""}`}>
        {props.label}
      </div>
      <input
        onFocus={() => {
          setFocus(true);
          setTouched(true);
        }}
        onBlur={() => setFocus(false)}
        className={`dateInput ${focus || touched ? "inputActive" : ""}`}
        type="date"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}
