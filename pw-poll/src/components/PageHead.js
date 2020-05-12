import React from "react";
import { useHistory } from "react-router";

export default function PageHead({ title, noBack, ...props }) {
  const hist = useHistory();
  return (
    <div
      {...props}
      style={{ marginBottom: "20px" }}
      className="flex-space-between"
    >
      <div>
        <div className="big-text">{title}</div>
        {noBack ? null : (
          <div className="small-text link" onClick={() => hist.goBack()}>
            &lt;&lt; Back
          </div>
        )}
      </div>
    </div>
  );
}
