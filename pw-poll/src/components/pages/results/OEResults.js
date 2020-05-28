import React from "react";
import Card from "../../card/Card";

export default function OEResults({ question, ...props }) {
  return (
    <Card
      title={
        <div className="flex-space-between">
          <div>{question.text}</div>
          <div>Open Ended</div>
        </div>
      }
    >
      <div className="big-text">Repsonses: </div>
      <hr />
      <div style={{ maxHeight: "500px", overflow: "scroll" }}>
        {question.votes.map((res, index) => (
          <div key={res.email + index}>
            <div>{res.response}</div>
            <hr />
          </div>
        ))}
      </div>
    </Card>
  );
}
