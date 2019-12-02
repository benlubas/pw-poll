import React, { useState } from "react";
import { useHov } from "./../hooks/useHov";
import { dateFormat } from "./../pipes";
import "./SmallPollCard.css";

const SmallPollCard = props => {
  const [hovRef, hov] = useHov();
  const [state, setState] = useState({
    removed: false,
    expanded: false,
    recentlyDeleted: null
  });

  return (
    <div
      ref={hovRef}
      className={state.removed ? "card-sm removed-sm" : "card-sm"}
      style={
        hov
          ? { backgroundColor: "var(--darker)" }
          : { backgroundColor: "var(--lighter)" }
      }
    >
      <div className="card-title-sm">
        {(state.removed ? "(REMOVED) " : "") + props.title}
      </div>
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
      <div
        onClick={() => {
          if (!state.removed) {
            setState({
              ...state,
              recentlyDeleted: props.remove(props.dbID),
              removed: true
            });
          } else {
            props.recov(state.recentlyDeleted);
            setState({
              ...state,
              recentlyDeleted: null,
              removed: false
            });
          }
        }}
        className={state.removed ? "recov-btn-sm" : "delete-btn-sm"}
      >
        {state.removed ? "RECOVER" : "DELETE"}
      </div>
    </div>
  );
};

export default SmallPollCard;
