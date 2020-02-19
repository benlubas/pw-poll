import React, { useState } from "react";

import "./alert.css";

export default function Alert(props) {
  const [show, setShow] = useState(
    props.show === undefined ? true : props.show
  );
  return show ? (
    <div
      className={`alert ${
        props.varient === undefined ? "warning" : props.varient
      }`}
    >
      <div className="title">
        {props.children}
        <div
          onClick={() => {
            setShow(false);
          }}
          className="pointer close"
        >
          X
        </div>
      </div>
    </div>
  ) : null;
}
