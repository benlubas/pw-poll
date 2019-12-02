import React, { useState } from "react";
import "./pollCard.css";
import { titlecase, dateFormat } from "./../pipes";
import { useHov } from "../hooks/useHov";

const PollCard = props => {
  const [hovRef, hov] = useHov();
  const [state, setState] = useState({ removed: false });

  return (
    <div
      ref={hovRef}
      style={hov ? { background: "var(--darker)" } : {}}
      className={state.removed ? "removed-card card" : "card"}
    >
      <div className="card-title">
        {titlecase(props.title)} {state.removed ? "(REMOVED)" : ""}
      </div>
      <div className="card-body">
        <div>Description: {props.desc}</div>
        <div>Start: {dateFormat(props.openDate)}</div>
        <div>End: {dateFormat(props.closeDate)}</div>
        <div
          className="del-btn"
          onClick={() => {
            props.remove(props.dbID);
            setState({ ...state, removed: true });
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default PollCard;
