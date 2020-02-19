import React, { useState, useEffect } from "react";
import { titlecase, dateFormat } from "../../pipes";
import { useHov } from "../../hooks/useHov";

const PollCard = props => {
  const [hovRef, hov] = useHov();
  const [state, setState] = useState({
    removed: false,
    expanded: props.small
  });

  //force expanded to change when the display changes.
  useEffect(() => {
    setState({ ...state, expanded: !props.small });
  }, [props.small]);

  return (
    <div
      //? Card Container
      className={props.small ? "card-sm" : "card"}
      ref={hovRef}
      style={hov ? { borderImage: "var(--blue-grad) 1 1" } : null}
    >
      <div className="card-title">
        {titlecase(props.title)} {state.removed ? "(REMOVED)" : null}
      </div>
      <div
        onClick={
          !props.size
            ? () => setState({ ...state, expanded: !state.expanded })
            : null
        }
        className="card-desc"
        style={
          state.expanded ? { whiteSpace: "normal" } : { whiteSpace: "nowrap" }
        }
      >
        Description: {props.desc}
      </div>
      <div className="open-date">Start: {dateFormat(props.openDate)}</div>
      <div className="close-date">End: {dateFormat(props.closeDate)}</div>
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
  );
};

export default PollCard;
