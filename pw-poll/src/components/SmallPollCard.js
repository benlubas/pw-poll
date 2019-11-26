import React, { useState } from "react";
import { dateFormat } from "./../pipes";
import "./SmallPollCard.css";
import { stat } from "fs";

const SmallPollCard = props => {
  const [hov, setHov] = useState(false);
  const [state, setState] = useState({ removed: false, expanded: false });

  return (
    <div className="card-sm">
      <div className="card-title-sm">{props.title}</div>
      <div
        onClick={() => setState({ ...state, expanded: !state.expanded })}
        className="card-desc-sm"
        style={
          state.expanded ? { whiteSpace: "normal" } : { whiteSpace: "nowrap" }
        }
      >
        {props.desc}
      </div>
      <div className="card-open-date-sm">{dateFormat(props.openDate)}</div>
      <div className="card-close-date-sm">{dateFormat(props.closeDate)}</div>
    </div>
  );
};

export default SmallPollCard;
