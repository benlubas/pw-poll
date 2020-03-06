import React from "react";

import "./card.css";

export default function Card(props) {
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : null)}
      className={"card " + props.classes || ""}
    >
      <div className="title">{props.title}</div>
      <div className="content">{props.children}</div>
      <div className="footer">{props.footer}</div>
    </div>
  );
}
