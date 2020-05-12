import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./alert.css";

export default function Alert(props) {
  const [show, setShow] = useState(
    props.show === undefined ? true : props.show
  );
  const alertRoot = document.getElementById("modal-root");
  return show
    ? ReactDOM.createPortal(
        <div
          className={`alert ${
            props.variant === undefined ? "warning" : props.variant
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
        </div>,
        alertRoot
      )
    : null;
}
